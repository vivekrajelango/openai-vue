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
      name: 'home',
      component: HomeView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatWindow
    },
    {
      path: '/playground',
      name: 'playground',
      component: Playground
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
