<template>
  <div>
    <div class="nameBot">
    <span
      v-for="(char, index) in textArray"
      :key="index"
      :class="{ visible: visibleChars.includes(index) }"
    >
      <!-- Nếu ký tự là khoảng trắng, hiển thị &nbsp; -->
      {{ char === " " ? "\u00A0" : char }}
    </span>
  </div>
    <div class="suggest" v-if="!messageSent">
      <div class="suggest-area"><p id="suggest1">Regarding Technology Features</p></div>
      <div class="suggest-area"><p id="suggest2">Regarding Technology Features</p></div>
      <div class="suggest-area"><p id="suggest3">Regarding Technology Features</p></div>
      <div class="suggest-area"><p id="suggest4">Regarding Technology Features</p></div>
    </div>

    <!-- message box here -->
    <div class="chat-box" v-if="messageSent">
      <div class="chat-message">
        {{ lastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted  } from "vue"

const lastMessage = ref("")
const messageSent = ref(false)

const text = "Foxconn ChatBot"
const textArray = ref(text.split(""))
const visibleChars = ref([])

const showCharacters = () => {
  textArray.value.forEach((_, index) => {
    setTimeout(() => {
      visibleChars.value.push(index)
    }, index * 110)
  })
}

onMounted(() => {
  showCharacters()
})
</script>
  
  <style scoped>
  .chats-container {
    max-height: 80vh;
    overflow-y: auto;
  }
  p#suggest1, p#suggest2, p#suggest3, p#suggest4 {
    background-color: #f1f1f1;
    width: max-content;
    font-size: smaller;
    padding: 1.3em 3em;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
}
p#suggest1:hover, p#suggest2:hover, p#suggest3:hover, p#suggest4:hover {
  background-color: #D2D2D2;
  color: darkgreen;
  text-decoration: underline;
  text-underline-offset: 2px;  
  transition: all 0.2s ease-in-out;
}
.suggest {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1%;
}
.suggest-area {
    display: flex;
    justify-content: center;
    align-items: center;
}
.nameBot {
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    font-weight: 500;
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
}
.nameBot span {
  opacity: 0;
  transition: opacity 0.3s linear, transform 0.22s ease;
  transform: translateX(40px);
}

.nameBot span.visible {
  opacity: 1;
  transform: translateX(0);
}
.nameBot::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  bottom: 1px;
  background-color: black;
  transition: all 0.3s ease-in-out;
}
.nameBot:hover::after {
  width: 97%;
  transition: all 0.3s ease-in-out;
}
  </style>
  