// es6模块倒入
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import eventBus from 'vue3-eventbus'

// 引用手机端NutUI
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'

// 引用PC端element-plus
import installElementPlus from './plugins/element'
const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).use(eventBus).use(NutUI).mount('#app')
