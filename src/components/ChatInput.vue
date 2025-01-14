<template>
  <div class="chat-box" :style="{ bottom: chatBoxBottom }">
    <div class="input-container" :class="sidebarClass">
      <input
        v-model="message"
        type="text"
        class="message-input"
        placeholder="Message FoxconnGPT :))"
        @keydown="handleKeydown"
        />
      <div class="buttons-container">
        <button
          class="send-button"
          :disabled="!message"
          :style="{
            backgroundColor: message ? '#007bff' : 'unset',
            cursor: message ? 'pointer' : 'unset',
          }"
          @click="sendChats"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useChatStore } from '../stores/Chatstore';
import { storeToRefs } from 'pinia';
const chatStore = useChatStore();
const {leftBarLoading} = storeToRefs(chatStore);
const message = ref('');
const chatId = ref(null);
const chatBoxBottom = ref('')
const emit = defineEmits(['sendMessage'])
const route = useRoute(); // Lấy route hiện tại
const router = useRouter();
import { useThemeStore } from '../stores/useThemeStore'
import { inject } from "vue"

// biến config dc inject 'config' vào để làm url động thay đổi trong public/config.json:
const config = inject('config');

// Get trạng thái `isDarkMode` từ store
const themeStore = useThemeStore();
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'));

// Hàm kiểm tra đường dẫn
const updateChatBoxPosition = () => {
  if (route.path.startsWith(`/chats/messages/`)) {
    chatBoxBottom.value = '50px';
  }
};

// watch thay đổi của route (nếu đang ở path /chats/messages/chatId) thì sẽ cập nhật chatBoxBottom
watch(
  () => route.path,
  updateChatBoxPosition,
  { immediate: true }
);

// func xu ly xuống dòng khi an phim shift+enter9xuogn dong), ngan ko cho sendChats luon
const handleKeydown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendChats();
  }
};
// Gửi tin nhắn
const sendChats = async () => {
  console.log('Starting sendChats...');
  chatBoxBottom.value = '50px';
  const currentMessage = message.value;
  message.value = '';

  // Nếu chatId có trong URL, dùng chatId đó, nếu không thì tạo chat mới
  if (!route.params.chatId) {
    if (!chatId.value) {
      try {
        console.log('About to call create chat API...');
        const createChatResponse = await fetch(`${config.API_BASE_URL}/api/v1/chats/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ model: 'qwen2.5:0.5b' }),
        });

        if (!createChatResponse.ok) {
          const errorText = await createChatResponse.text();
          console.error('Error creating chat:', createChatResponse.status, errorText);
          return;
        }

        const chatData = await createChatResponse.json();
        chatId.value = chatData.id;
        console.log('Chat created successfully:', chatData);
        
        leftBarLoading.value = true
        // Chuyển hướng đến URL mới
        router.push(`/chats/messages/${chatId.value}/`);
      } catch (error) {
        console.error('Error in create chat:', error);
        return;
      }
    }
  } else {
    // Nếu có chatId trong URL, dùng chatId đó
    chatId.value = route.params.chatId;
  }
  if (!currentMessage) return; // Nếu không có tin nhắn thì dừng
  // Emit tin nhắn người dùng đi
  emit('sendMessage', { content: currentMessage, role: 'user', chatId: chatId.value });
};

// Đồng bộ trạng thái ban đầu
updateChatBoxPosition();
</script>

<style lang="scss" scoped>
@keyframes toRightFromLeft {
    49% {
      transform: translateX(100%);
    }
    50% {
      opacity: 0;
      transform: translateX(-100%);
    }
    51% {
      opacity: 1;
    }
  }
  .input-container.dark-sidebar {
    background-color: rgba(50,50,50,.85);
  }
  .chat-box {
    display: flex;
    gap: 10px;
    position: absolute;
    width: 45%;
    bottom: 18%;
    left: 55%;
    transition: all 0.35s ease-in-out;
    transform: translateX(-50%);
    z-index: 3;
  }
  
  .input-container {
    display: flex;
    flex: 1;
    position: relative;
    border: 2px solid #b0b0b0;
    padding: 16px 10px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 0.15s linear;
    position: relative;
    &:focus-within {
      border: 2px solid #4caf50;
      transition: all 0.15s linear;
    }
}
  
  .message-input {
    width: 100%;
    border: none;
    outline: none;
  }
  
  .buttons-container {
    display: flex;
    gap: 10px;
    &:hover, &:active, &:focus {
      .send-button {
        background-color: #696161;
        transition: all 0.35s ease-in-out;
        &::after {
          animation: toRightFromLeft 0.33s ease-in-out forwards;
        }
      }
    }
  }
  
  .send-button {
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    cursor: pointer;
    background-color: #007bff;
    transition: all 0.35s ease-in-out;
    color: white;
    position: relative;
    padding: 1.2em 1.3em;
    overflow: hidden;
      &::after {
        position: absolute;
        width: 100%;
        height: 100%;
        content: '➤';
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:disabled::after {
        color: #D2D2D2;
        background-color: transparent;
      }
      &:disabled:hover::after, &:disabled:active::after, &:disabled:focus::after {
        animation: none;
      }
  }
</style>