import { createApp } from 'vue'
import App from './App.vue'
// Styles
import './style.css'
// Router
import router from "./router/index"

const app = createApp(App);
app.use(router)
app.mount('#app');
