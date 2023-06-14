import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// add router to pinia stores
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')