import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'vue-toastification/dist/index.css'
const app = createApp(App)
const options: PluginOptions = {
  position: POSITION.BOTTOM_CENTER
}
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Toast, options)
pinia.use(piniaPluginPersistedstate)

app.mount('#app')
