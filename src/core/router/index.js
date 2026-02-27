import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/modules/properties/views/HomeView.vue'
import PropertyDetailView from '@/modules/properties/views/PropertyDetailView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/property/:id',
        name: 'property-detail',
        component: PropertyDetailView,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router