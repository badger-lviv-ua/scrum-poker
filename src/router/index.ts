import { createRouter, createWebHistory } from 'vue-router'
import NewGame from '../views/NewGame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/new-game',
      name: 'new-game',
      component: NewGame
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/',
      redirect: '/new-game'
    }
  ]
})

export default router
