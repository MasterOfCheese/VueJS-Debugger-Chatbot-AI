<template>
  <div class="chat-response" v-if="props.response">
    <span>{{ props.response }}</span>
  </div>
</template>

<script setup lang="js">
import { defineProps } from "vue"

// Khai báo props
const props = defineProps({
  response: {
    type: String,
    required: false,
    default: ""
  }
})
</script>

<style scoped>
.chat-response {
  width: 100%;
}
.chat-response span {
  margin-top: 20px;
  padding: 0.8em 1.3em;
  border-radius: 25px;
  background-color: #DDD;
  display: inline-flex;
}
</style>
