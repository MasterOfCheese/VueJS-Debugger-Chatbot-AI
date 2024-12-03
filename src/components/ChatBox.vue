<template>
    <div class="chat-box">
      <div class="input-container">
        <input
          v-model="message"
          type="text"
          class="message-input"
          placeholder="Message FoxconnGPT :))"
        />
        <div class="buttons-container">
          <button class="send-button" @click="sendChats"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  import { ref } from "vue";
  // import { sendAllMessages } from "@/service";
  // import { CHATS } from "@/stores/chat";
  
  const message = ref("");

  
  // async function sendChats() {
  //   const userMessage = {
  //     role: "user",
  //     content: message.value,
  //   };
  //   CHATS.value.push(userMessage);
  
  //   let chatGPTMessage = await sendAllMessages(CHATS.value);
  //   CHATS.value.push(chatGPTMessage);
  // }
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
    width: 45%;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
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
  }
  </style>
  