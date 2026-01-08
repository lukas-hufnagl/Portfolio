import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { i18n } from './i18n'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

createApp(App)
  .use(router)
  .use(i18n)
  .use(MotionPlugin)
  .mount('#app')