// es6模块倒入
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from 'vue3-eventbus'

createApp(App).use(store).use(router).use(eventBus).mount('#app')
