import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from '../views/ItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/catalog'
    },
    {
      path: '/catalog',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/catalog',
      beforeEnter: (to, from, next) => {
        const { id } = to.query;
        if (id) {
          next(`/catalog/${id}`);
        } else {
          next();
        }
      },
      component: HomeView
    },
    {
      path: '/catalog/:id',
      component: ItemView
    },
  ]
})

export default router
