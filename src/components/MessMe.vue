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
import { ref, onMounted, computed } from 'vue'
import { useThemeStore } from '../stores/useThemeStore'

// const sidebarClass = ref('default-sidebar-class')
const messageArray = 'What can I help with?'.split('')
const visibleMessageChars = ref([])

// Get trạng thái `isDarkMode` từ store
const themeStore = useThemeStore();
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'));

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
    left: 50%;
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

.mess-me.dark-sidebar {
    color: #fff;
}
</style>