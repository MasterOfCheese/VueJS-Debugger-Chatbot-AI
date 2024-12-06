import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('message', () => {
  const message = ref('')
  const messageSent = ref(false)
  const response = ref('');

  function setMessage(newMessage) {
    message.value = newMessage
    messageSent.value = true
    getResponse(newMessage)
  }

  function getResponse(message) {
    response.value = `You said: ${message} :)))`;
  }
  return { message, messageSent, setMessage, response }
})