import { createApp } from 'vue'
import App from './App.vue'
// ⭐️ Packages
import Antd from 'ant-design-vue';
// Styles
import 'ant-design-vue/dist/antd.css';
import './style.css'
// Router
import router from "./router/index"

const app = createApp(App);
app.use(Antd)
app.use(router)
app.mount('#app');
