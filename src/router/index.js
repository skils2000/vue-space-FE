import { createRouter, createWebHistory } from 'vue-router'
import ApplicationView from '../views/ApplicationView.vue';
import ApplicationManager from '@/components/ApplicationManager.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/applications',
      name: 'Applications',
      component: ApplicationView,
    },
    {
      path: '/apps',
      name: 'apps',
      component: ApplicationManager
    }
  ]
})

export default router
