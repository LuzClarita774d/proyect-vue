<template>

<div class="rating">

<img
v-for="n in rating"
:key="n"
src="@/assets/imagenes/logos/estrella.svg"
class="star"
/>

<span>{{ rating }}</span>

</div>

</template>

<script setup>

const props = defineProps({
rating:Number
})

</script>

<style scoped>

.rating{
display:flex;
align-items:center;
gap:4px;
}

.star{
width:14px;
}

</style>