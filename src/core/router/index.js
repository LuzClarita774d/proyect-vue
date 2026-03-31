import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/modules/properties/views/HomeView.vue'
import PropertyDetailView from '@/modules/properties/views/PropertyDetailView.vue'
import ResultsView from '@/modules/properties/views/ResultsView.vue'
import CheckoutView from '@/modules/properties/views/CheckoutView.vue'
import HostView from '@/modules/properties/views/HostView.vue'
const routes = [

{
  path: '/',
  name: 'home',
  component: HomeView,
  meta: { header: 'default' }
},
{
  path: '/results',
  name: 'results',
  component: ResultsView,
  meta: { header: 'search' }
},
{
  path: '/property/:id',
  name: 'property',
  component: PropertyDetailView,
  props: true,
  meta: { header: 'default' }
},
{
  path: '/checkout',
  name: 'checkout',
  component: CheckoutView,
  meta: { header: 'default' }
},
{
  path: '/host',
  name: 'host',
  component: HostView,
  meta: { header: 'default' }
}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router