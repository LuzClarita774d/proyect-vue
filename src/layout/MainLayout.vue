<template>

<div>

  <Header v-if="route.path === '/'" />
  <HeaderSearch v-else />

  <router-view />
  <Footer />

</div>

</template>

<script setup>

import { useRoute } from 'vue-router'
import Header from './Header.vue'
import HeaderSearch from './HeaderSearch.vue'
import Footer from './Footer.vue'

const route = useRoute()

</script>