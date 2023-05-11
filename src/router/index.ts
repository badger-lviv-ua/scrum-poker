import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/new-game',
      name: 'new-game',
      component: () => import('../views/NewGame.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import('../views/GameView.vue'),
      beforeEnter: isAuthenticated
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: '/new-game'
    }
  ]
})

async function isAuthenticated(to: any): Promise<{ name: string } | boolean> {
  const currentUser = await getCurrentUser()
  if (!currentUser && to.name !== 'sign-in') {
    return { name: 'sign-in' }
  }
  return true
}

export default router
