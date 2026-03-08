import { createApp } from 'vue'
import App from './App.vue'
import router from './core/router'
import './assets/styles/main.css'
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App).use(router).mount('#app')