import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/game',
      name: 'game-home',
      component: () => import('@/views/GameHomeView.vue'),
    },
    {
      path: '/game/:verb/:pronoun',
      name: 'game',
      component: () => import('@/views/GameView.vue'),
      props: (route) => ({
        verbIn: route.params.verb,
        forcePronomial: route.query.fp !== undefined && route.query.fp !== '0' ? '1' : '0',
        showRare: route.query.shr !== undefined && route.query.shr !== '0' ? '1' : '0',
      }),
    },
  ],
})

export default router
