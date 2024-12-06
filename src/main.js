import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// createApp(App).mount('#app')

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app')