// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
      dark: {
        colors: {
          background: '#121212', // Nền tổng thể
          surface: '#1E1E1E',   // Nền cho các phần tử nổi
          primary: '#BB86FC',   // Màu chính
          secondary: '#03DAC6', // Màu phụ
          accent: '#03DAC6',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
})


export default vuetify