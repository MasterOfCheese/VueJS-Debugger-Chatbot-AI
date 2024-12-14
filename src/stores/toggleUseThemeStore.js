import { defineStore } from 'pinia'
import { ref } from 'vue'

export const toggleUseThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)

  // func set chế độ dark/light
  const setDarkMode = (value) => {
    isDarkMode.value = value
    document.body.classList.toggle('dark-mode', value)
    document.body.classList.toggle('light-mode', !value)
  }

  // đồng bộ class cho `document.body`
  const syncWithVuetify = (vuetifyTheme) => {
    const isDark = vuetifyTheme.global.current.value.dark
    setDarkMode(isDark)
  }

  return { isDarkMode, setDarkMode, syncWithVuetify }
})
