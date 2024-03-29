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
import markdownToolbar from 'quill-markdown-toolbar';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// Google Oauth 2.0
import GoogleSignInPlugin from "vue3-google-signin"

const globalOptions = {
    modules: {
        toolbar: [
            { header: [1, 2, 3, 4, 5, 6, false] },
            'bold',
            'image',
            'code-block',
        ],
    },
    theme: 'snow'
}

QuillEditor.props.globalOptions.default = () => globalOptions

// Create a new store instance.
export const store = createStore({
    state() {
        return {
            authen: JSON.parse(localStorage.getItem('authen') || "null"), // ถ้าหากว่ามี user object อยู่ใน localstorage
            isNavHide: false,
            modal: {
                isModalOpen: false,
                content: "",
                redirectTo: ""
            },
        }
    },
    mutations: {
        setAuthen(state, payload) {
            state.authen = payload;

            if (!payload) {
                localStorage.removeItem("authen");
            } else {
                localStorage.setItem("authen", JSON.stringify(payload));
            }
        },
        setIsNavHide(state, status) {
            state.isNavHide = status;
        },
        setIsModalOpen(state, payload) {
            state.modal = { ...payload };
        }
    }
})

const app = createApp(App);
app.use(GoogleSignInPlugin, {
    clientId: import.meta.env.VITE_CLIENT_ID,
});
app.use(router)
app.use(store)
app.component("Flicking", Flicking);
app.use(Chartkick.use(Chart))
app.component('QuillEditor', QuillEditor)
app.mount('#app');
