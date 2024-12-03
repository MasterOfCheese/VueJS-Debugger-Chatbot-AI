<template>
    <div>
      <Message
        v-for="(chat, index) in CHATS"
        :key="index"
        :content="chat.content"
        :role="chat.role"
      />
      <div class="nameBot">Foxconn ChatBot</div>
      <div class="suggest">
        <div class="suggest-area"><p id="suggest1">Regarding Technology Features</p></div>
        <div class="suggest-area"><p id="suggest2">Regarding Technology Features</p></div>
        <div class="suggest-area"><p id="suggest3">Regarding Technology Features</p></div>
        <div class="suggest-area"><p id="suggest4">Regarding Technology Features</p></div>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  import { onMounted, ref } from "vue";
//   import MessageBox from "./MessageBox.vue";
  // import { CHATS } from "@/stores/chat";
  
  const chatsContainer = ref(null);
  
  onMounted(() => {
    chatsContainer.value?.scrollTo(0, chatsContainer.value.scrollHeight);
  });
  </script>
  
  <style scoped>
  .chats-container {
    max-height: 80vh;
    overflow-y: auto;
  }
  p#suggest1, p#suggest2, p#suggest3, p#suggest4 {
    background-color: #F9F9F9;
    width: max-content;
    font-size: smaller;
    padding: 1.3em 3em;
    cursor: pointer;
    border-radius: 8px;
}
.suggest {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1%;
}
.suggest-area {
    display: flex;
    justify-content: center;
    align-items: center;
}
.nameBot {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 50px;
}
  </style>
  