import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServiceView from '../views/ServiceView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			beforeEnter: (to, from, next) => {
				if (to.query.id) {
					next({ name: 'item', params: { id: to.query.id } });
				} else {
					next();
				}
			}
		},
		{
			path: '/?id=:id',
			name: 'item',
			component: ServiceView,
			props: true
		}
	]
})

export default router
