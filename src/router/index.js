import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from '../views/ItemView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/catalog',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      beforeEnter: (to, from, next) => {
        const { id } = to.query;
        if (id) {
          next(`/${id}`);
        } else {
          next();
        }
      },
      component: HomeView
    },
    {
      path: '/:id',
      component: ItemView
    },
  ]
})

export default router
