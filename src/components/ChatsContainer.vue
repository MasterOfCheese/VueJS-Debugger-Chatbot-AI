<template>
  <div>
    <div class="nameBot" v-if="!messageSent" :class="sidebarClass">
      <span v-for="(char, index) in textArray" :key="index" :class="{ visible: visibleChars.includes(index) }">
        {{ char === " " ? "\u00A0" : char }}
      </span>
    </div>
    <div class="suggest" v-if="!messageSent" :class="sidebarClass">
      <div class="suggest-area"><p id="suggest1">Regarding Technology Features</p></div>
      <div class="suggest-area"><p id="suggest2">Regarding Technology Features</p></div>
      <div class="suggest-area"><p id="suggest3">Regarding Technology Features</p></div>
      <div class="suggest-area"><p id="suggest4">Regarding Technology Features</p></div>
    </div>

    <div class="chat-box" v-if="messageSent">
      <div class="chat-message">
        <p>{{ message }}</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="js">
import { ref, onMounted, computed } from "vue"
import { useThemeStore } from '../stores/useThemeStore'


// Get trạng thái `isDarkMode` từ store
const themeStore = useThemeStore();
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'));

// Biến cục bộ thay thế Pinia store
const messageSent = ref(false)
const message = ref('')

// Text animation logic
const text = 'Foxconn ChatBot'
const textArray = ref(text.split(''))
const visibleChars = ref([])

// Hiển thị từng ký tự với hiệu ứng
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
    color: black;
}
p#suggest1:hover, p#suggest2:hover, p#suggest3:hover, p#suggest4:hover {
  background-color: #D2D2D2;
  color: darkgreen;
  /* text-decoration: underline; */
  /* text-underline-offset: 2px;   */
  transition: all 0.2s ease-in-out;
}
.suggest {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* column-gap: 5%; */
    width: max-content;
    gap: 20px;
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
/* .nameBot::after {
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
} */
  .chat-box {
      width: 100%;
      display: flex;
      justify-content: right;
      /* margin-top: -4em; */
  }
  .chat-box .chat-message {
    width: 80%;
    display: flex;
    justify-content: right;
}
  .chat-message p {
      width: fit-content;
      background-color: #DDD;
      padding: 0.8em 1.3em;
      border-radius: 25px;
  }
  .dark-sidebar {
  color: #fff;
}
  </style>
  