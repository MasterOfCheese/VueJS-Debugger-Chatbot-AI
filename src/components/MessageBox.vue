<template>
    <div>
      <span v-if="isUser" class="user-icon"></span>

      <img v-else class="chatgpt-icon"/>
      <div class="respond-bar">
        <div v-if="!isUser" class="chatgpt-name">Chatbot</div>
        <div class="message-content">{{ content }}</div>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  import { computed } from "vue";
  import { defineProps } from 'vue'
  
  const props = defineProps({
    content: String,
    role: String
  });
  
  const isUser = computed(() => {
    return props.role === "user";
  });
  </script>
  
  <style scoped>
  .message {
    display: flex;
    gap: 10px;
    align-items: flex-start; /* Căn chỉnh phần tử theo chiều dọc */
    margin-bottom: 15px;
  }
  
  .message-user {
    justify-content: flex-end; /* Căn tin nhắn người dùng về bên phải */
  }
  
  .message-chatgpt {
    justify-content: flex-start; /* Căn tin nhắn ChatGPT về bên trái */
  }
  
  .user-icon {
    font-size: 18px;
  }
  
  .chatgpt-icon {
    /* width: 20px;
    height: 20px; */
    margin-top: 4px;
  }
  
  .user-name,
  .chatgpt-name {
    font-weight: bold;
    font-size: 14px;
  }
  
  .message-content {
    max-width: 60%;
    padding: 8px 12px;
    background-color: #f0f0f0;
    border-radius: 8px;
    word-wrap: break-word;
  }
  
  .message-user .message-content {
    background-color: #7a91e2; /* Màu nền cho tin nhắn người dùng */
    color: white;
  }
  
  .message-chatgpt .message-content {
    background-color: #e1e1e1; /* Màu nền cho tin nhắn ChatGPT */
    color: black;
  }
  </style>
  