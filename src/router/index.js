import { createRouter, createWebHistory } from 'vue-router'
import ApplicationManager from '@/components/ApplicationManager.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/apps',
      name: 'apps',
      component: ApplicationManager
    }
  ]
})

export default router
