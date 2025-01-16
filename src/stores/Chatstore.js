import { defineStore } from 'pinia';
import { ref } from 'vue';
import { config } from '../config'; // Import từ file config.js
import router from '@/router';

export const useChatStore = defineStore('chat', () => {

  const leftBarLoading = ref(false)
  
  // State cho tin nhắn và danh sách threads
  const messages = ref([]);

  // Fetch tin nhắn của một thread cụ thể
  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/chats/messages/${chatId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      // console.log('nếu log chạy được tới cái console log này nghĩa là đã fetch được toàn bộ cuộc trò chuyện bằng GET method rồi');
      if (!response.ok) {
        if (response.status === 404) {
          console.error(`Chat ID ${chatId} not found. Redirecting to home.`);
          router.push('/'); // Điều hướng về trang chủ
        }
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      const formattedMessages = data.map((message) => ({
        ...message,
        role: message.chat_role,
      }));
      messages.value = formattedMessages;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Gửi tin nhắn mới
  const sendMessage = async (chatId, content) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/v1/chats/messages/${chatId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          content,
          chat_role: 'user',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const newMessage = await response.json();
      messages.value.push(newMessage);
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  return { messages, leftBarLoading,fetchMessages, sendMessage };
});
