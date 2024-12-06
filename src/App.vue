<script setup lang="js">
import { useMessageStore } from '@/stores/messageStore';
import ChatBox from "./components/ChatBox.vue";
import ChatsContainer from "./components/ChatsContainer.vue";
import LeftSideBar from "./components/LeftSideBar.vue";

const messageStore = useMessageStore()
</script>

<template>
  <div class="wrapper">
    <LeftSideBar class="side-bar"/>
    <div class="app-container">
      <ChatsContainer :messageSent="messageStore.messageSent" :lastMessage="messageStore.message" class="chats-container" />
      <ChatBox />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  height: 95vh;
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
    height: 100%;
    overflow-y: scroll;
}
.side-bar::-webkit-scrollbar-thumb {
  background-color: black;
}
</style>
