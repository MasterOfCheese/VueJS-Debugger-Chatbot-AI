import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import { io } from 'socket.io-client'

// Thay đổi URL của server (http://localhost:8000 nếu chạy cục bộ)
const socket = io("http://172.20.10.4:5000");

const app = createApp(App)

socket.on("response", (data) => {
    console.log("Server response:", data);
    console.log("Da ket noi")
  });
  
app.use(router)
app.use(vuetify)
app.use(createPinia())

app.mount('#app')