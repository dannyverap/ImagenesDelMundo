import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImagesView from '../views/ImagesView.vue'
import RankingView from '@/views/RankingView.vue'
import RewardSummaryView from '@/views/RewardSummaryView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/search/:query',
      name: 'searchResults',
      component: ImagesView,
      props: (route) => ({
        query: route.params.query
      }),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/rewardSummary',
      name: 'rewardSummary',
      component: RewardSummaryView,
      meta: {
        requireAuth: false
      }
    }
  ]
})

export default router
