<template>
  <div class="reserved" style="position: absolute; bottom: 10px; font-size: 12px; left: 47.8%;" :class="sidebarClass">
   <span>Copyright © by <strong style="color: red;">AI Department</strong>. All right reserved.</span>
 </div>
</template>
<script setup lang="js">
import { computed } from "vue"
import { useThemeStore } from '../stores/useThemeStore'

// Get trạng thái `isDarkMode` từ store
const themeStore = useThemeStore();
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'));
</script>
<style lang="scss" scoped>
.dark-sidebar {
    color: #fff;
}
</style>