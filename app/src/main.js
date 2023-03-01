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
// Chart.js
import "@egjs/vue3-flicking/dist/flicking-inline.css";
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js/auto';
// Rich text editor (Quill)
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            authen: JSON.parse(localStorage.getItem('authen')) || false,
            isNavHide:false,
            modal: {
                isModalOpen: false,
                content: "",
                redirectTo: ""
            }
        }
    },
    mutations: {
        setAuthen(state, payload) {
            state.authen = payload;

            if(!payload){
                localStorage.removeItem("authen");
            }else{
                localStorage.setItem("authen", true);
                
            }
        },
        setIsNavHide(state, status){
            state.isNavHide = status;
        },
        setIsModalOpen(state, payload){
            state.modal = {...payload};
        }
    }
})

const app = createApp(App);
app.use(router)
app.use(store)
app.component("Flicking", Flicking);
app.use(Chartkick.use(Chart))
app.component('QuillEditor', QuillEditor)
app.mount('#app');
