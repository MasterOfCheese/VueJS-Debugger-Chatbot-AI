<template>
    <div class="chat-response" v-if="response">
      <span>{{ response }}</span>
    </div>
  </template>
  
  <script setup lang="js">
  import { computed } from 'vue';
  import { useMessageStore } from '@/stores/messageStore';
  
  const messageStore = useMessageStore();
  const response = computed(() => messageStore.response);
  </script>
  
  <style scoped>
  .chat-response {
    width: max-content;
  }
  .chat-response span {
    margin-top: 20px;
    padding: 0.8em 1.3em;
    /* border: 1px solid #ccc; */
    border-radius: 25px;
    background-color: #DDD;
    width: max-content;
    display: inline-flex;
  }
  </style>