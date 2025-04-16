import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

import Main from './components/Main.vue'
import Authorization from './components/Authorization.vue'
import RegistrationAdmin from './components/RegistrationAdmin.vue'

const routes = [
    { path: '/', component: Main },
    { path: '/auth', component: Authorization },
    { path: '/reg-admin', component: RegistrationAdmin },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
