import { createApp } from 'vue'
import App from './App.vue'
// Styles
import './style.css'
// Router
import router from "./router/index"
// Vuex
import { createStore } from 'vuex'
// Carousel
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
// Or, if you have to support IE9
import "@egjs/vue3-flicking/dist/flicking-inline.css";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            authen: JSON.parse(localStorage.getItem('authen')) || false,
            isNavHide:false,
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
        },
        setIsNavHide(state, status){
            state.isNavHide = status
        }
    }
})

const app = createApp(App);
app.use(router)
app.use(store)
app.component("Flicking", Flicking);
app.mount('#app');
