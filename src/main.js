import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AOS from 'aos'

import './styles/app.css';
import 'aos/dist/aos.css'
// import '@coreui/coreui/dist/css/coreui.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
AOS.init();
app.mount('#app')
