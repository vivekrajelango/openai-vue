import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatWindow from '../components/ChatWindow.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatWindow
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    
  ]
})

export default router
