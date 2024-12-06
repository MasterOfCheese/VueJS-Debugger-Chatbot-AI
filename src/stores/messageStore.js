import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: '', // Lưu trữ giá trị của message
  }),

  actions: {
    setMessage(newMessage) {
      this.message = newMessage; // Thay đổi giá trị message trong store
    },
  },
});
