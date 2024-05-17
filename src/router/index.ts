import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImagesView from '../views/ImagesView.vue'
import SearchView from '@/views/SearchView.vue'
import BillingView from '@/views/BillingView.vue'
import RankingView from '@/views/RankingView.vue'
import SellersView from '@/views/SellersView.vue'

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
      path: '/billing',
      name: 'billing',
      component: BillingView,
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
      path: '/sellers',
      name: 'sellers',
      component: SellersView,
      meta: {
        requireAuth: false
      }
    }
  ]
})

export default router
