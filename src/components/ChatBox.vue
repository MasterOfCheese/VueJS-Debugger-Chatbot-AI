<template>
  <div class="chat-container">
    <!-- Thay đổi logic v-if để hiển thị khi chưa gửi tin nhắn -->
    <div class="mess-me" :class="sidebarClass">
      <span
        v-for="(char, index) in messageArray"
        :key="index"
        :class="{ visible: visibleMessageChars.includes(index) }"
      >
        {{ char === " " ? "\u00A0" : char }}
      </span>
    </div>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['sendMessage'])
// state cục bộ thay thế messageStore
const message = ref('')
// const messageSent = ref(false)

const messageArray = 'What can I help with?'.split('')
const visibleMessageChars = ref([])
const sidebarClass = ref('default-sidebar-class')
const chatBoxBottom = ref('')

// Gửi tin nhắn
const sendChats = async () => {
  emit('sendMessage', message.value);
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

    message.value = '';
    console.log('Tin nhắn đã gửi thành công');
  } catch (error) {
    console.error('Error sending message: ', error);
  }
};

const animateMessage = () => {
  messageArray.forEach((_, index) => {
    setTimeout(() => {
      visibleMessageChars.value.push(index);
    }, index * 70);
  });
};

onMounted(() => {
  animateMessage();
});
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
    width: 16%;
    bottom: 18%;
    left: 55%;
    transition: all 0.35s ease-in-out;
    transform: translateX(-50%);
    &:focus-within, &:hover, &:active {
      width: 45%;
      transition: all 0.35s ease-in-out;
    }
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
  .mess-me {
    position: absolute;
    width: max-content;
    bottom: 30%;
    left: 55%;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
}
.mess-me span {
  opacity: 0;
  transform: translateX(-80px);
  transition: opacity 0.2s ease-in, transform 0.1s ease-in;
}

.mess-me span.visible {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 1.3s;
}

.dark-sidebar {
  color: #fff;
}
  </style>
  