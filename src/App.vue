<script setup lang="js">
import { useMessageStore } from '@/stores/messageStore';
import ChatBox from "./components/ChatBox.vue";
import ChatsContainer from "./components/ChatsContainer.vue";
import LeftSideBar from "./components/LeftSideBar.vue";
import { ref, watch, onMounted, computed } from 'vue'
import ToggleMode from './components/ToggleMode.vue'
import { useTheme } from 'vuetify/lib/framework'
import { useThemeStore } from './stores/useThemeStore'
import { toggleUseThemeStore } from './stores/toggleUseThemeStore'
import axios from "axios";

const theme = useTheme()
const themeStore = useThemeStore()
const toggleThemeStore = toggleUseThemeStore()

// theo dõi sự thay đổi từ Vuetify + cập nhật vào Pinia
watch(
  () => theme.global.current.value.dark,
  (isDark) => {
    themeStore.setDarkMode(isDark)
    toggleThemeStore.setDarkMode(isDark)
  }
)
// đồng bộ trạng thái ban đầu
onMounted(() => {
 themeStore.syncWithVuetify(theme)
 toggleThemeStore.syncWithVuetify(theme)
})
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'))
const toggleSidebarClass = computed(() => (themeStore.isDarkMode ? 'toggle-dark-sidebar' : 'toggle-light-sidebar'))

const messageStore = useMessageStore()

// state điều khiển hiển thị modal tìm kiếm
const showSearchBar = ref(false)
const searchText = ref('')

const performSearch = () => {
  console.log('Searching:', searchText.value)
  alert(`You are searching for: ${searchText.value}`)
}

// Các state cho đăng nhập
const username = ref('');
const password = ref('');
const token = ref('');
const errorMessage = ref('');

// Hàm đăng nhập
const login = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/auth/token', new URLSearchParams({
      username: username.value,
      password: password.value,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    token.value = response.data.access_token;
    console.log("token.value", token.value)
    localStorage.setItem('accessToken', token.value);
    errorMessage.value = '';
    // Có thể điều hướng sang trang khác sau khi đăng nhập thành công
    console.log('Đăng nhập thành công!', token.value);
  } catch (error) {
    errorMessage.value = 'Đăng nhập thất bại! Kiểm tra lại tên đăng nhập hoặc mật khẩu.';
    console.error(error);
  }
};

</script>

<template>
  <div class="wrapper">
    <LeftSideBar class="side-bar" @trigger-search="showSearchBar = true" :class="sidebarClass" />
    <div class="app-container">
      <!-- Kiểm tra nếu người dùng chưa đăng nhập, hiển thị form đăng nhập -->
      <div v-if="!token" class="login-container">
        <h2>Đăng nhập</h2>
        <form @submit.prevent="login">
          <div>
            <label for="username">Tên người dùng:</label>
            <input type="text" v-model="username" id="username" required />
          </div>
          <div>
            <label for="password">Mật khẩu:</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>
      <div v-if="token">
      <ChatsContainer :messageSent="messageStore.messageSent" :lastMessage="messageStore.message" class="chats-container" />
      <ChatBox />
    </div>
  </div>
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
  width: 80%;
  margin: 0 auto;
  padding-bottom: 0;
}

.chats-container {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  position: absolute;
  max-width: 710px;
  min-width: 45%;
  /* background: aqua; */
  top: 5%;
  left: 55%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.side-bar {
    width: 260px;
    background-color: #F9F9F9;
    margin: -8px 0 0 -8px;
    overflow: hidden;
    height: 101%;
    overflow-y: scroll;
}
.dark-sidebar {
    background-color: #011E4D;
}
.toggle-dark-sidebar {
  background-color: rgb(59, 87, 87);
  box-shadow: 3.7px 7.4px 7.4px hsla(0, 8%, 91%, 0.39)!important;
  color: #778eb4;
  }
</style>