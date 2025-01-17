<script setup lang="js">
import ChatsContainer from "./components/ChatsContainer.vue"
import LeftSideBar from "./components/LeftSideBar.vue"
import { ref, watch, onMounted, computed } from 'vue'
import ToggleMode from './components/ToggleMode.vue'
import { useTheme } from 'vuetify/lib/framework'
import { useThemeStore } from './stores/useThemeStore'
import { toggleUseThemeStore } from './stores/toggleUseThemeStore'
import LoginPage from './components/LoginPage.vue'
import { useRouter, useRoute } from 'vue-router'
import MessageBox from "./components/MessageBox.vue"
import UserOptions from "./components/UserOptions.vue"
import CopyrightBar from './components/CopyrightBar.vue'
import MessMe from "./components/MessMe.vue"
import ChatInput from "./components/ChatInput.vue"
import { useSessionStore } from "./stores/SessionStore"
import { useChatStore } from '@/stores/Chatstore'
import NotFound from "./components/NotFound.vue"
import { inject } from "vue"
import SignUp from "./components/SignUp.vue"
import { debounce } from "lodash"

// import EChartsComponent from "./components/EChartsComponent.vue"

// When I wrote this code, only I and God knew how it worked.
// Now, only God knows it :D
// Happy debugging! =^__^=!


const tab = ref(null);
// biến config dc inject 'config' vào để làm url động thay đổi trong public/config.json:
const config = inject('config');

// State quản lý tin nhắn
const isAuthenticated = ref(!!localStorage.getItem('token'))
const router = useRouter()
const theme = useTheme()
const themeStore = useThemeStore()
const toggleThemeStore = toggleUseThemeStore()
// state điều khiển hiển thị modal tìm kiếm
const showSearchBar = ref(false)
const searchText = ref('')
const route = useRoute();
const sessionStore = useSessionStore();
const chatStore = useChatStore();
// for search funcion()
const searchResults = ref([]);
const loading = ref(false);

const fetchSearchResults = async (query) => {
  if (!query) {
    searchResults.value = [];
    return;
  }

  loading.value = true;
  try {
    const params = new URLSearchParams({ keyword: query }).toString();
    const response = await fetch(
     `${config.API_BASE_URL}/api/v1/chats/search/conversations?${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
    // console.log("response status:", response.status);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    searchResults.value = data || [];
  } catch (error) {
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

const onSearchInput = debounce(() => {
  fetchSearchResults(searchText.value);
}, 500);
// router dieu huong user ve trang chứa chatId co ket qua trung voi ket qua tim kiem
const navigateToChat = (chatId) => {
  console.log("Navigating to chat:", chatId);
  router.push(`/chats/messages/${chatId}`);
};

//định nghĩa biến isNotFound cho trang 404 not found
const isNotFound = computed(() => route.name === 'NotFound');

// Xác định xem router-view có hiển thị không
const showRouterView = computed(() => route.path.startsWith('/chats'));

// Mảng lưu tất cả tin nhắn
const messages = ref([])
const handleSendMessage = async ({ content, role, chatId }) => {
  messages.value.push({ content, role });
  // Thêm tin nhắn vào store
  chatStore.messages.push({ content, role });

  try {
    const response = await fetch(`${config.API_BASE_URL}/api/v1/chats/messages/${chatId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role, content }],
      }),
    });

    if(!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
  } catch (error) {
    console.error('Error calling API:', error);
  }
};

// --------------------------------------------------------
// theo dõi sự thay đổi từ Vuetify + cập nhật vào Pinia
watch(
  () => theme.global.current.value.dark,
  (isDark) => {
    themeStore.setDarkMode(isDark)
    toggleThemeStore.setDarkMode(isDark)
  }
)

// Logic xử lý trạng thái đăng nhập
const onLoginSuccess = (token) => {
  localStorage.setItem('token', token);
  isAuthenticated.value = true;

  const redirectUrl = sessionStore.getUrl();
  if (!redirectUrl || redirectUrl === '/') {
    console.log('No previous URL, redirecting to homepage.');
    router.push('/');
  } else {
    console.log('Redirecting to previous URL:', redirectUrl);
    router.push(redirectUrl);
  }
};

// đồng bộ trạng thái ban đầu
onMounted(() => {
  themeStore.syncWithVuetify(theme);
  toggleThemeStore.syncWithVuetify(theme);
  if (localStorage.getItem('token')) {
    isAuthenticated.value = true;
  } else {
    // const currentUrl = route.fullPath;
    console.log('Current URL:', route.fullPath); // Debug
    sessionStore.saveUrl(route.fullPath);
  }
},
() => {
      if (route.params.chatId) {
        chatStore.fetchMessages(route.params.chatId);
      }
    })
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'))
const toggleSidebarClass = computed(() => (themeStore.isDarkMode ? 'toggle-dark-sidebar' : 'toggle-light-sidebar'))
</script>

<template>
  <div>
    <div v-if="!isNotFound">
      <v-card class="nam-card">
        <v-tabs v-if="!isAuthenticated" v-model="tab" bg-color="primary">
          <v-tab value="one">Login</v-tab>
          <v-tab value="two">Sign Up</v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-if="!isAuthenticated" v-model="tab">
            <v-tabs-window-item value="one">
              <LoginPage
                v-if="!isAuthenticated"
                @login-success="onLoginSuccess"
              />
            </v-tabs-window-item>

            <v-tabs-window-item value="two">
              <SignUp />
            </v-tabs-window-item>
          </v-tabs-window>

          <div v-else class="wrapper">
            <LeftSideBar
              class="side-bar"
              @trigger-search="showSearchBar = true"
              :class="sidebarClass"
            />
            <div class="app-container">
              <!-- ChatsContainer ẩn khi messageSent = true -->
              <ChatsContainer
                v-if="!showRouterView && messages.length === 0"
                class="chats-container"
              />
              <!-- MessMe ẩn khi messageSent = true -->
              <MessMe v-if="messages.length === 0 && !showRouterView" />
              <div
                class="chat-box"
                style="
                  overflow-y: auto;
                  width: 106.5%;
                  margin: 0 auto;
                  height: 87%;
                "
              >
                <!-- Hiển thị tất cả tin nhắn (cả user và assistant) -->
                <div
                  v-for="(msg, index) in messages"
                  :key="index"
                  class="chat-bar"
                  style="max-width: 770px; margin: 0 auto"
                >
                  <MessageBox :content="msg.content" :role="msg.role" />
                </div>
              </div>
              <!-- Router-view ẩn khi ở URL "/" -->
              <div
                class="router-view"
                :class="sidebarClass"
                :style="{ display: showRouterView ? 'block' : 'none' }"
              >
                <router-view class="namdeptrai-view" />
                <!-- <EChartsComponent/> -->
              </div>
            </div>
            <!-- Chat Input -->
            <ChatInput @sendMessage="handleSendMessage" />
            <!-- vuetify Modal Search Bar -->
            <v-dialog
              v-model="showSearchBar"
              persistent
              max-width="500"
              transition="dialog-transition">
              <v-card>
                <v-card-title>
                  <span class="headline">Search Chats</span>
                </v-card-title>

                <v-card-text>
                  <v-text-field
                    v-model="searchText"
                    label="Type your search"
                    :loading="loading"
                    clearable
                    @input="onSearchInput"
                  />

                  <v-divider class="my-4"></v-divider>
                  <div v-if="loading" class="text-center">
                    <v-progress-circular
                      indeterminate
                      color="blue"
                    ></v-progress-circular>
                  </div>
                  <div v-else-if="searchResults.length > 0">
                    <v-list>
                      <v-list-item
                        v-for="(result, index) in searchResults"
                        :key="index"
                        @click="navigateToChat(result.chat_id)"
                        class="cursor-pointer"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{ result.chat_name }}</v-list-item-title>
                          <v-list-item-subtitle v-if="result.messages.length > 0">
                            First message: <span class="result-content">"{{ result.messages[0].content }}"</span>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle v-else>
                            No messages yet.
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                  <div v-else-if="searchText && searchResults.length === 0"
                    class="text-center">No results found.
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="showSearchBar = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <toggle-mode :class="toggleSidebarClass" />
            <UserOptions />
            <CopyrightBar />
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <NotFound />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  height: 100vh;
  overflow: hidden;
}
.router-view {
  display: none;
}

.router-view.dark-sidebar {
  background-color: #212121;
}
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  margin: 0 auto;
  padding-bottom: 0;
  padding-top: 80px;
  position: relative;
}

.chats-container {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  position: absolute;
  max-width: 710px;
  min-width: 45%;
  /* background: aqua */
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  /* justify-content: center */
  align-items: center;
}

.side-bar {
  min-width: 260px;
  max-width: 260px;
  background-color: #f9f9f9;
  margin: -8px 0 0 -8px;
  overflow: hidden;
  height: 101%;
}
.dark-sidebar {
  background-color: #212121;
}
.toggle-dark-sidebar {
  background-color: rgb(59, 87, 87);
  box-shadow: 3.7px 7.4px 7.4px hsla(0, 8%, 91%, 0.39) !important;
  color: #778eb4;
}
.router-view {
  width: 109.4%;
  overflow-y: scroll;
  position: relative;
  top: -17%;
  height: 520%;
  z-index: 3;
  background-color: #fff;
}
.namdeptrai-view {
  width: 70%;
  margin: 0 auto;
}
.v-tab.v-tab.v-btn {
  width: 50% !important;
  font-size: 17px;
  color: #8b8a89;
}
.v-slide-group.v-tabs.v-tabs--horizontal.v-tabs--align-tabs-start.v-tabs--density-default.bg-primary {
  max-width: 27% !important;
  scale: 1.4;
  z-index: 9;
  position: relative;
  top: 3em;
  margin: 0 auto;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}
.v-window-item {
  top: -4em;
  position: relative;
}
.v-card-text {
  font-size: medium !important;
  letter-spacing: 0.0178571429em !important;
  padding: 0 !important;
}
.v-dialog > .v-overlay__content > .v-card, .v-dialog > .v-overlay__content > form > .v-card {
  width: 35em;
  border: 2px solid #997e1bc7;
  border-radius: 12px;
}
span.result-content {
    color: #fff;
    font-style: italic;
}
.v-list-item-subtitle {
    color: #b2adad;
}

</style>
