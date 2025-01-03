import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {

  const leftBarLoading = ref(false)
  
  // State cho tin nhắn và danh sách threads
  const messages = ref([]);

  // Fetch tin nhắn của một thread cụ thể
  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`http://172.20.10.4:5000/api/v1/chats/messages/${chatId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
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

  return { messages, leftBarLoading,fetchMessages };
});
