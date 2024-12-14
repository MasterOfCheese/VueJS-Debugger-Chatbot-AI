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
</script>

<template>
  <div class="wrapper">
    <LeftSideBar class="side-bar" @trigger-search="showSearchBar = true" :class="sidebarClass" />
    <div class="app-container">
      <ChatsContainer :messageSent="messageStore.messageSent" :lastMessage="messageStore.message" class="chats-container" />
      <ChatBox />
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