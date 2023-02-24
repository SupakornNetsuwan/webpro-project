import { createApp } from 'vue'
import App from './App.vue'
// Styles
import './style.css'
// Router
import router from "./router/index"
// Vuex
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            authen: JSON.parse(localStorage.getItem('authen')) || false,
        }
    },
    mutations: {
        setAuthen(state, payload) {
            state.authen = payload

            if(!payload){
                localStorage.removeItem("authen");
            }else{
                localStorage.setItem("authen", true);
                
            }
        }
    }
})

const app = createApp(App);
app.use(router)
app.use(store)
app.mount('#app');
