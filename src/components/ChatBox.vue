<template>
  <div class="chat-container">
    <div class="mess-me" v-if="!messageStore.messageSent">
      <span
        v-for="(char, index) in messageArray"
        :key="index"
        :class="{ visible: visibleMessageChars.includes(index) }"
      >
        {{ char === " " ? "\u00A0" : char }}
      </span>
    </div>

    <div class="chat-box">
      <div class="input-container">
        <input
          v-model="message"
          type="text"
          class="message-input"
          placeholder="Message FoxconnGPT :))"
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


<script setup lang="js">
import { ref, onMounted } from "vue"
import { useMessageStore } from '@/stores/messageStore'

const message = ref("")
const messageStore = useMessageStore()

function sendChats() {
  if (message.value) {
  console.log("Message sent:", message.value)
  messageStore.setMessage(message.value)
  message.value = ''
  }
}

const messageText = 'What can I help with?'
const messageArray = ref(messageText.split(''))
const visibleMessageChars = ref([])

const showMessageCharacters = () => {
  setTimeout(() => {
    messageArray.value.forEach((_, index) => {
      setTimeout(() => {
        visibleMessageChars.value.push(index)
      }, index * 50)
    })
  }, 1800)
}

onMounted(() => {
  showMessageCharacters()
})
</script>

  
  <style lang="scss" scoped>
  @keyframes toRightFromLeft {
    49% {
    transform: translateX(100%);
    }
    50% {
    opacitX: 0;
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
    bottom: 12%;
    left: 50%;
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
    bottom: 23%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mess-me span {
  opacity: 0;
  transition: opacity 0.3s linear, transform 0.35s;
  transform: translateX(-80px);
}

.mess-me span.visible {
  opacity: 1;
  transform: translateX(0);
}
  </style>
  