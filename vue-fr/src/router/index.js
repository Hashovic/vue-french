import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/conjugation',
      name: 'conjugation-home',
      component: () => import('@/views/ConjugationHomeView.vue'),
    },
    {
      path: '/conjugation/:verb',
      name: 'conjugation',
      component: () => import('@/views/ConjugationView.vue'),
      props: (route) => ({
        verbIn: route.params.verb,
        forcePronomial: route.query.fp !== undefined && route.query.fp !== '0' ? '1' : '0',
      }),
    },
    {
      path: '/practice',
      name: 'practice-home',
      component: () => import('@/views/PracticeHomeView.vue'),
    },
    {
      path: '/practice/:verb',
      name: 'practice',
      component: () => import('@/views/PracticeView.vue'),
      props: (route) => ({
        verbIn: route.params.verb,
        options: route.query.opt,
      }),
    },
  ],
})

export default router
