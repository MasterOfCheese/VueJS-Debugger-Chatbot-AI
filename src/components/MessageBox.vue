<template>
    <div>
      <span v-if="isUser" class="user-icon">&#128100;</span>
      <img
        v-else
        src="../assets/chatgpt.svg"
        alt="chatgpt logo"
        class="chatgpt-icon"
      />
      <div>
        <div v-if="isUser" class="user-name">You</div>
        <div v-else class="chatgpt-name">ChatGPT</div>
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
  }
  
  .user-icon {
    font-size: 18px;
  }
  
  .chatgpt-icon {
    width: 16px;
    height: 16px;
    margin-top: 4px;
  }
  
  .user-name,
  .chatgpt-name {
    font-weight: bold;
  }
  
  .message-content {
    margin-top: 5px;
  }
  </style>
  