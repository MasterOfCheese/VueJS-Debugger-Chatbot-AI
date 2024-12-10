<script setup lang="js">
import { useMessageStore } from '@/stores/messageStore';
import ChatBox from "./components/ChatBox.vue";
import ChatsContainer from "./components/ChatsContainer.vue";
import LeftSideBar from "./components/LeftSideBar.vue";
import { ref } from 'vue'
import ToggleMode from './components/ToggleMode.vue';

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
    <LeftSideBar class="side-bar" @trigger-search="showSearchBar = true" />
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
    <toggle-mode />
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
  max-width: max-content;
  min-width: 45%;
  /* background: aqua; */
  top: 17%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.side-bar {
    width: 20%;
    background-color: #F9F9F9;
    margin: -8px 0 0 -8px;
    overflow: hidden;
    height: 101%;
    overflow-y: scroll;
}
</style>