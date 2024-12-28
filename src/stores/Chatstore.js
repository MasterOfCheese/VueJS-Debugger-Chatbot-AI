// stores/chatStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  // Lưu trữ tin nhắn của cuộc trò chuyện
  const messages = ref([]); 

  // Hàm lấy tin nhắn từ API
  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`http://192.168.220.25:5000/chats/${chatId}/messages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'), // Nếu cần token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
          // Xử lý trường `role` (hoặc `chat_role`)
          const formattedMessages = data.map(message => ({
            ...message, 
            role: message.chat_role 
          }));
      messages.value = formattedMessages; 
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // func post tin nhắn mới lên API
  const sendMessage = async (chatId, content) => {
    try {
      const response = await fetch(`http://192.168.220.25:5000/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          content,
          chat_role: 'user', // or 'assistant', tùy theo vai trò
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

  return { messages, fetchMessages, sendMessage };
});
