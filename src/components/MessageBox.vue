<template>
  <div :class="['block-chats', { 'user-chat': isUser, 'ChatBot-chat': !isUser }]">
    <span v-if="isUser" class="user-icon"></span>
    <img v-else class="ChatBot-icon" />
    
    <div :class="['respond-bar', { 'user-respond': isUser, 'ChatBot-respond': !isUser }]">
      <div v-if="!isUser" class="ChatBot-name"><img :src="logoUrl" alt="Chatbot Logo"></div>
      <div :class="['message-content', { 'user-message': isUser, 'ChatBot-message': !isUser }]">
        {{ content }}
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="js">
  import { computed } from "vue";
  import { defineProps } from 'vue'
  import logoUrl from "@/assets/logoFii.png"
  const props = defineProps({
    content: String,
    role: String
  });
  
  const isUser = computed(() => {
    return props.role === "user";
  });
  </script>
  
  <style scoped>
  .block-chats {
  /* display: flex; */
  /* align-items: center; */
  margin-bottom: 10px;
}

/* User-specific styles */
.user-chat .user-icon {
  /* background-color: #007bff; */
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

/* .user-respond {
  background-color: #e6f7ff;
  color: #0056b3;
} */

.user-message {
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  margin-left: auto;
}

/* Chatbot-specific styles */
.chatgpt-chat .chatgpt-icon {
  background-color: #28a745;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.chatgpt-respond {
  background-color: #f8f9fa;
  color: #212529;
}

.chatgpt-message {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
}


  .message {
    display: flex;
    gap: 10px;
    align-items: flex-start; /* Căn chỉnh phần tử theo chiều dọc */
    margin-bottom: 15px;
  }
  
  .message-user {
    justify-content: flex-end; /* Căn tin nhắn người dùng về bên phải */
  }
  
  .message-ChatBot {
    justify-content: flex-start; /* Căn tin nhắn ChatBot về bên trái */
  }
  
  .user-icon {
    font-size: 18px;
  }
  
  .ChatBot-icon {
    /* width: 20px;
    height: 20px; */
    margin-top: 4px;
  }
  
  .user-name,
  .ChatBot-name {
    font-weight: bold;
    width: 35px;
    height: 35px;
    border: 2px solid #f1f1f1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-40%);
    background-color: #fff;
  }
  .ChatBot-name img {
    display: flex;
    width: 23px;
    height: 23px;
  }
  
  .message-content {
    max-width: 60%;
    padding: 8px 12px;
    background-color: #f0f0f0;
    border-radius: 8px;
    word-wrap: break-word;
    width: max-content;
  }
  
  .message-user .message-content {
    background-color: #7a91e2; /* Màu nền cho tin nhắn người dùng */
    color: white;
  }
  
  .message-ChatBot .message-content {
    background-color: #e1e1e1; /* Màu nền cho tin nhắn ChatBot */
    color: black;
  }
  .respond-bar.ChatBot-respond {
    margin-top: -1em;
    margin-bottom: 2.5em;
    display: flex;
    gap: 0.5em;
}
  </style>
  