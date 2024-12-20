<template>
    <div class="mess-me" :class="sidebarClass">
      <span
        v-for="(char, index) in messageArray"
        :key="index"
        :class="{ visible: visibleMessageChars.includes(index) }"
      >
        {{ char === " " ? "\u00A0" : char }}
      </span>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sidebarClass = ref('default-sidebar-class')
const messageArray = 'What can I help with?'.split('')
const visibleMessageChars = ref([])

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

// .dark-sidebar {
//   color: #fff;
// }
</style>