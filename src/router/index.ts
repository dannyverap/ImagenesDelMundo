import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImagesView from '../views/ImagesView.vue'
import RankingView from '@/views/RankingView.vue'
import RewardSummaryView from '@/views/RewardSummaryView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import { useAuthStore } from '@/stores/Auth'
import { useToast } from 'vue-toastification'

const toast = useToast()

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
        requireAuth: true
      }
    },
    {
      path: '/rewardSummary',
      name: 'rewardSummary',
      component: RewardSummaryView,
      meta: {
        requireAuth: true
      }
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const { isAuthenticated } = auth
  const needAuth = to.meta.requireAuth

  if (!needAuth) {
    next()
    return
  }
  if (!isAuthenticated) {
    toast.warning('You need to be logged')
    next({ name: 'login' })
  }
  if (isAuthenticated) {
    try {
      const isValidToken = await auth.validateToken()
      if (!isValidToken) {
        toast.error('Token invalido')
        next({ name: 'login' })
      }
      next()
    } catch (error) {
      toast.error('Something went wrong')
      next({ name: 'login' })
    }
  }
})
export default router
