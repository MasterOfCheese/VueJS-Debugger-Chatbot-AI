<template>
    <!-- Ô nhập tin nhắn và nút gửi -->
    <div class="chat-box" :style="{ bottom: chatBoxBottom }">
      <div class="input-container">
        <input
          v-model="message"
          type="text"
          class="message-input"
          placeholder="Message FoxconnGPT :))"
          @keydown.enter="sendChats"
        />
        <div class="buttons-container">
          <button
            class="send-button"
            :disabled="!message"
            :style="{
              backgroundColor: message ? '#007bff' : 'unset',
              cursor: message ? 'pointer' : 'unset',
            }"
            :title="!message ? 'Message is empty!' : ''"
            @click="sendChats"
          ></button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['sendMessage'])
// state cục bộ thay thế messageStore
const message = ref('')
// const messageSent = ref(false)

const chatBoxBottom = ref('')

// Gửi tin nhắn
const sendChats = async () => {
  // Xóa tin nhắn ngay khi nhấn nút gửi
  emit('sendMessage', message.value);
  message.value = '';  // Xóa tin nhắn người dùng nhập vào
  
  // Cập nhật giá trị chatBoxBottom
  chatBoxBottom.value = '50px';

  if (!message.value) return;

  const payload = {
    messages: [
      {
        role: 'user',
        content: message.value,
      },
    ],
  };

  console.log('Payload: ', payload);

  try {
    const res = await fetch('http://192.168.220.25:5000/chats/1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJ1c2VyX3JvbGUiOiJ1c2VyIiwiZXhwIjoxNzk0NDA1Mzc5fQ.6FOoOjOeztGoQUOb-5GWQP_h8Tiv7KjvrtOJMGf3hwY',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Server response: ', res);
      throw new Error('Network error');
    }

    console.log('Tin nhắn đã gửi thành công');
  } catch (error) {
    console.error('Error sending message: ', error);
  }
};

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
  .chat-box {
    display: flex;
    gap: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: absolute;
    width: 45%;
    bottom: 18%;
    left: 55%;
    transition: all 0.35s ease-in-out;
    transform: translateX(-50%);
    background-color: #fff;
  }
  
  .input-container {
    display: flex;
    flex: 1;
    position: relative;
    border: 2px solid #d1d1d1;
    padding: 10px;
    border-radius: 8px;
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