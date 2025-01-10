import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import { io } from 'socket.io-client'

fetch('/config.json')
.then(response => response.json())
.then(data => {
  const config = data; // Load cấu hình từ file config.json
  
// Sử dụng URL từ config
const socket = io(config.API_BASE_URL);

const app = createApp(App)

socket.on("response", (data) => {
    console.log("Server response:", data);
    console.log("Da ket noi")
  });

// Cung cấp config cho toàn bộ ứng dụng
app.provide('config', config);

app.use(router)
app.use(vuetify)
app.use(createPinia())

app.mount('#app')
})
.catch(error => {
  console.error('Failed to load config:', error);
});
