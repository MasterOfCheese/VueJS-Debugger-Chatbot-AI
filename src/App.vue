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

// When I wrote this code, only I and God knew how it worked.
// Now, only God knows it :D 
// Happy debugging! =^__^=!
 
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

// Xác định xem router-view có hiển thị không
const showRouterView = computed(() => route.path.startsWith('/chats'));

// Mảng lưu tất cả tin nhắn
const messages = ref([])
const handleSendMessage = async ({ content, role, chatId }) => {
  messages.value.push({ content, role });
  // Thêm tin nhắn vào store
  chatStore.messages.push({ content, role });

  try {
    const response = await fetch(`http://172.20.10.4:5000/api/v1/chats/messages/${chatId}/`, {
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

    if(response.ok) {
      // window.location.reload()
    } else {
      throw new Error('HTTP error! status: ' + response.status);
    }

    // Đọc response dưới dạng stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let partialLine = '';
    let fullResponse = '';
    let doneReading = false;

    while (!doneReading) {
      const { done, value } = await reader.read();
      if (done) {
        if (partialLine) {
          try {
            const jsonObject = JSON.parse(partialLine);
            if (jsonObject.message && jsonObject.message.content) {
              fullResponse += jsonObject.message.content;
            }
          } catch (jsonError) {
            console.error('Error parsing final line:', partialLine, jsonError);
          }
        }
        doneReading = true;
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = (partialLine + chunk).split('\n');
      partialLine = lines.pop();

      for (const line of lines) {
        if (line.trim() !== '') {
          try {
            const jsonObject = JSON.parse(line);
            if (jsonObject.message && jsonObject.message.content) {
              fullResponse += jsonObject.message.content;
            }
          } catch (jsonError) {
            console.error('Error parsing line:', line, jsonError);
          }
        }
      }
    }

    // Thêm phản hồi đầy đủ của chatbot vào danh sách messages
    if (fullResponse) {
      addResponseFromModel(fullResponse.trim());
      // chatStore.fetchMessages(chatId);
    }
  } catch (error) {
    console.error('Error calling API:', error);
  }
};

const addResponseFromModel = (response) => {
  // Thêm phản hồi từ chatbot vào store và messages
  messages.value.push({ content: response, role: "assistant" });
  // chatStore.messages.push({ content: response, role: "assistant" });
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

// const messageStore = useMessageStore()

const performSearch = () => {
  console.log('Searching:', searchText.value)
  alert(`You are searching for: ${searchText.value}`)
}
</script>

<template>
  <div>
    <LoginPage v-if="!isAuthenticated" @login-success="onLoginSuccess" />
    <div v-else class="wrapper">
    <LeftSideBar class="side-bar" @trigger-search="showSearchBar = true" :class="sidebarClass" />
    <div class="app-container">
        <!-- ChatsContainer ẩn khi messageSent = true -->
        <ChatsContainer v-if="messages.length === 0" class="chats-container" />
        <!-- MessMe ẩn khi messageSent = true -->
        <MessMe v-if="messages.length === 0" />
        <div class="chat-box" style="overflow-y: auto; width: 106.5%; margin: 0 auto; height: 87%;">
          <!-- Hiển thị tất cả tin nhắn (cả user và assistant) -->
          <div v-for="(msg, index) in messages" :key="index" class="chat-bar" style="max-width: 770px; margin: 0 auto;">
            <MessageBox :content="msg.content" :role="msg.role" />
          </div>
        </div> 
         <!-- Router-view ẩn khi ở URL "/" -->
        <div class="router-view" :style="{ display: showRouterView ? 'block' : 'none' }">
          <router-view class="namdeptrai-view" />
        </div>
      </div>
    <!-- Chat Input -->
    <ChatInput @sendMessage="handleSendMessage" />
      <!-- vuetify Modal Search Bar -->
      <v-dialog
        v-model="showSearchBar"
        persistent
        max-width="500"
        transition="dialog-transition"
      >
      <v-card>
        <v-card-title>
          <span class="headline">Search Chats...</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="searchText"
            label="Type your search"
            append-icon="mdi-magnify"
            @keyup.enter="performSearch"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showSearchBar = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="performSearch">Search</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <toggle-mode :class="toggleSidebarClass" />
    <UserOptions />
    <CopyrightBar/>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  overflow: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  margin: 0 auto;
  padding-bottom: 0;
  padding-top: 80px;
}

.chats-container {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  position: absolute;
  max-width: 710px;
  min-width: 45%;
  /* background: aqua */
  top: 5%;
  left: 55%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  /* justify-content: center */
  align-items: center;
}

.side-bar {
    min-width: 260px;
    max-width: 260px;
    background-color: #F9F9F9;
    margin: -8px 0 0 -8px;
    overflow: hidden;
    height: 101%;
}
.dark-sidebar {
    background-color: #011E4D;
}
.toggle-dark-sidebar {
  background-color: rgb(59, 87, 87);
  box-shadow: 3.7px 7.4px 7.4px hsla(0, 8%, 91%, 0.39)!important;
  color: #778eb4;
  }
  .router-view {
    width: 106.8%;
    overflow-y: scroll;
    position: relative;
    top: -17%;
    height: 611%;
    z-index: 3;
    background-color: #fff;
}
.namdeptrai-view {
    width: 70%;
    margin: 0 auto;
}
</style>