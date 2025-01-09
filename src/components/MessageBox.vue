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
          <div :class="['message-content', sidebarClass, { 'user-message': message.role === 'user', 'ChatBot-message': message.role !== 'user' }]">
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
import logoUrl from "@/assets/logoFii_new.png";
import { useChatStore } from "@/stores/Chatstore";
import { useThemeStore } from '../stores/useThemeStore'

// Get trạng thái `isDarkMode` từ store
const themeStore = useThemeStore();
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'));

const route = useRoute();
const chatStore = useChatStore();

// Lấy tin nhắn từ store (Pinia)
const messagesFromStore = computed(() => chatStore.messages);

// Lấy chatId từ URL
const chatId = computed(() => route.params.chatId);

const displayedMessages = ref([]);
const isHistory = ref(false); // Biến kiểm tra xem đang hiển thị lịch sử chat hay không

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
        switch (message.role) {
          case "user":
            // Hiển thị toàn bộ cho user
            displayedMessages.value[index] = [...message.content];
            break;
          case "assistant":
            // Nếu không phải đoạn chat đã được tạo từ trc(đã được stored lại ở ChatStore) được truy cập thông qua ChatId, thì áp dụng hiệu ứng hiện từng ký tự
            if (!isHistory.value) {
              await displayMessageCharacters(index, message.content);
            } else {
              // Hiển thị toàn bộ đoạn chat(ko còn hiệu ứng gen từng ký tự) nếu đã được tạo từ trc(đã được stored lại ở ChatStore) được truy cập thông qua ChatId
              displayedMessages.value[index] = [...message.content];
            }
            break;
          default:
            // Xử lý các trường hợp khác nếu có
            console.warn("Unknown role:", message.role);
            break;
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
const fetchMessOnMessageBox = async (chatId) => {
  try {
    displayedMessages.value = []; // Xóa trạng thái hiển thị cũ
    isHistory.value = true; // Đánh dấu đang lấy dữ liệu lịch sử
    await chatStore.fetchMessages(chatId); // Gọi hàm fetchMessages trong store
    isHistory.value = false; // Tắt chế độ lịch sử sau khi hoàn thành
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// Theo dõi sự thay đổi của chatId và gọi fetchMessOnMessageBox khi thay đổi
watch(chatId, async (newChatId) => {
  if (newChatId) {
    displayedMessages.value = []; // Xóa dữ liệu hiển thị cũ
    await fetchMessOnMessageBox(newChatId); // Lấy tin nhắn mới
  }
});

// Gọi fetchMessOnMessageBox khi component được mount lần đầu tiên
onMounted(() => {
  if (chatId.value) {
    fetchMessOnMessageBox(chatId.value);
  }
});
</script>

<style scoped>
.message-content.dark-sidebar.ChatBot-message, .message-content.dark-sidebar.user-message {
    background-color: rgba(50,50,50,.85);
    color: white;
}
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
    width: max-content;
    height: 12px;
}
.ChatBot-name {
    border: 1px solid #f1f1f1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    transform: translateY(-35%);
}

.message-content {
  max-width: 60%;
  padding: 1% 2%;
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
