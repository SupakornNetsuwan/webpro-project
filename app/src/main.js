import { createApp } from 'vue'
import App from './App.vue'
// ⭐️ Packages
import Antd from 'ant-design-vue';
// styles
import 'ant-design-vue/dist/antd.css';
import './style.css'

const app = createApp(App);

app.use(Antd).mount('#app');
