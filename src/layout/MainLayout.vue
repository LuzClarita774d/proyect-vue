<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import Header from './Header.vue'
import HeaderSearch from './HeaderSearch.vue'
import Footer from './Footer.vue'

const route = useRoute()

const showDefaultHeader = computed(() =>
  route.name === 'home' || route.name === 'property'
)

const showSearchHeader = computed(() =>
  route.name === 'results'
)
</script>

<template>

<div>

  <Header v-if="showDefaultHeader" />
  <HeaderSearch v-else-if="showSearchHeader" />

  <router-view />

  <Footer />

</div>

</template>