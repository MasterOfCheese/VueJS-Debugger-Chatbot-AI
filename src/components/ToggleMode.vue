<template>
    <v-btn icon @click="toggleDarkMode"
      :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'" id="toggle-select-mode"
    >
      <v-icon>{{ isDarkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
    </v-btn>
  </template>
  
  <script>
  export default {
    computed: {
      isDarkMode() {
        return this.$vuetify.theme.global.name === 'dark' // get trang thai theme hien tai
      },
    },
    methods: {
      toggleDarkMode() {
        const newTheme = this.isDarkMode ? 'light' : 'dark'
        this.$vuetify.theme.global.name = newTheme // thay doi theme
        localStorage.setItem('theme(made by Nam Phuong)', newTheme) // save status vao localstorage
      },
    },
    mounted() {
        // auto khoi phuc mode tu localstorage khi f5 trang
      const savedTheme = localStorage.getItem('theme(made by Nam Phuong)') || 'light'
      this.$vuetify.theme.global.name = savedTheme
    },
  }
  </script>
<style lang="scss" scoped>
button#toggle-select-mode {
    position: relative;
    top: 20px;
    right: 25px;
    width: 75px;
    height: 30px;
    border-radius: 30px;
    box-shadow: 3.7px 7.4px 7.4px hsl(0deg 0% 0% / 0.39);
    i {
        display: flex;
        font-size: 20px;
    }
}
</style>  