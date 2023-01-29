import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import ChatWindow from '../components/ChatWindow.vue'
import CompositionView from '../components/Composition.vue'
import Playground from '../components/Playground.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'playground',
      component: Playground
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatWindow
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/composition',
      name: 'composition',
      component: CompositionView
    }
    
  ]
})

export default router
