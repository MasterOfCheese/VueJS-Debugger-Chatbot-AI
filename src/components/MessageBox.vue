<template>
  <div>
    <!-- Duyệt qua các tin nhắn từ store -->
    <div v-for="(message, index) in messagesFromStore" :key="index">
      <!-- Kiểm tra và phân loại message của user hoặc assistant -->
      <div :class="['block-chats', { 'user-chat': message.role === 'user', 'ChatBot-chat': message.role !== 'user' }]">
        <span v-if="message.role === 'user'" class="user-icon"></span>
        <img v-else class="ChatBot-icon" />
        
        <div :class="['respond-bar', { 'user-respond': message.role === 'user', 'ChatBot-respond': message.role !== 'user' }]">
          <div v-if="message.role !== 'user'" class="ChatBot-name">
            <img :src="logoUrl" alt="Chatbot Logo" />
          </div>
          <div :class="['message-content', { 'user-message': message.role === 'user', 'ChatBot-message': message.role !== 'user' }]">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { computed, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import logoUrl from "@/assets/logoFii.png";
import { useChatStore } from "@/stores/Chatstore";


// Khai báo các biến cần thiết
const route = useRoute();
const chatStore = useChatStore();

// Lấy tin nhắn từ store (Pinia)
const messagesFromStore = computed(() => chatStore.messages);

// Lấy chatId từ URL
const chatId = computed(() => route.params.chatId);

// Hàm lấy dữ liệu tin nhắn từ store
const fetchMessages = async (chatId) => {
  try {
    await chatStore.fetchMessages(chatId); // Gọi hàm fetchMessages trong store
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// theo dõi sự thay đổi của chatId và gọi fetchMessages khi thay đổi
watch(chatId, (newChatId) => {
  if (newChatId) {
    fetchMessages(newChatId); // Gọi hàm fetch khi chatId thay đổi
  }
});

// Gọi fetchMessages khi component được mount lần đầu tiên
onMounted(() => {
  if (chatId.value) {
    fetchMessages(chatId.value); // Gọi hàm fetch khi component được mount
  }
});
</script>

<style scoped>
.block-chats {
  margin-bottom: 10px;
}

.user-chat .user-icon {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.user-message {
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  margin-left: auto;
}

.ChatBot-icon {
  margin-top: 4px;
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
  background-color: #7a91e2;
  color: white;
}

.message-ChatBot .message-content {
  background-color: #e1e1e1;
  color: black;
}

.respond-bar.ChatBot-respond {
  margin-top: -1em;
  margin-bottom: 2.5em;
  display: flex;
  gap: 0.5em;
}
</style>
