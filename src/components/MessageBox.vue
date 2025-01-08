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
            <!-- Hiển thị tin nhắn user hoặc từng ký tự của chatbot -->
            <template v-if="message.role === 'user'">
              {{ message.content }}
            </template>
            <template v-else>
              <span v-for="(char, charIndex) in displayedMessages[index]" :key="charIndex">
                {{ char }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { computed, onMounted, watch, ref } from "vue";
import { useRoute } from 'vue-router';
import logoUrl from "@/assets/logoFii.png";
import { useChatStore } from "@/stores/Chatstore";

const route = useRoute();
const chatStore = useChatStore();

// Lấy tin nhắn từ store (Pinia)
const messagesFromStore = computed(() => chatStore.messages);

// Lấy chatId từ URL
const chatId = computed(() => route.params.chatId);

const displayedMessages = ref([]);

// hiển thị từng ký tự (chỉ dành cho chatbot)
const displayMessageCharacters = async (index, content) => {
  try {
    // Đảm bảo displayedMessages.value[index] là một mảng
    if (!Array.isArray(displayedMessages.value[index])) {
      displayedMessages.value[index] = [];
    }

    for (let i = 0; i < content.length; i++) {
      if (Array.isArray(displayedMessages.value[index])) {
        displayedMessages.value[index].push(content[i]); // push từng ký tự
      }
      await new Promise((resolve) => setTimeout(resolve, 0.1));
    }
  } catch (error) {
    console.error("Error in displayMessageCharacters:", error);
  }
};

// Cập nhật handleNewMessages để xử lý cả tin nhắn của user và chatbot
const handleNewMessages = async () => {
  try {
    // Đồng bộ hóa độ dài của displayedMessages với messagesFromStore
    while (displayedMessages.value.length < messagesFromStore.value.length) {
      displayedMessages.value.push([]);
    }
    for (let index = 0; index < messagesFromStore.value.length; index++) {
      const message = messagesFromStore.value[index];

      // Nếu chưa hiển thị tin nhắn này
      if (!displayedMessages.value[index] || displayedMessages.value[index].length === 0) {
        if (message.role !== "user") {
          await displayMessageCharacters(index, message.content); // Hiển thị từng ký tự
        } else {
          displayedMessages.value[index] = [...message.content]; // Hiển thị toàn bộ
        }
      }
    }
  } catch (error) {
    console.warn("Error handling new messages silently:", error.message);
  }
};

watch(messagesFromStore, () => {
  if (Array.isArray(messagesFromStore.value)) {
    handleNewMessages();
  } else {
    console.error("messagesFromStore is not an array:", messagesFromStore.value);
  }
}, { immediate: true });

// Lấy tin nhắn từ store khi chatId thay đổi
const fetchMessages = async (chatId) => {
  try {
    displayedMessages.value = []; // Xóa trạng thái hiển thị cũ
    await chatStore.fetchMessages(chatId); // Gọi hàm fetchMessages trong store
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// Theo dõi sự thay đổi của chatId và gọi fetchMessages khi thay đổi
watch(chatId, async (newChatId) => {
  if (newChatId) {
    displayedMessages.value = []; // Xóa dữ liệu hiển thị cũ
    await fetchMessages(newChatId); // Lấy tin nhắn mới
  }
});

// Gọi fetchMessages khi component được mount lần đầu tiên
onMounted(() => {
  if (chatId.value) {
    fetchMessages(chatId.value);
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
