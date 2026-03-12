<script setup>

import { ref, computed } from "vue"
import { properties } from "@/modules/properties/data/properties"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

const open = ref(false)
const search = ref("")

const cities = [...new Set(properties.map(p => p.city))]

const filtered = computed(()=>{

if(!search.value) return cities

return cities.filter(c =>
c.toLowerCase().includes(search.value.toLowerCase())
)

})

function selectCity(city){

search.value = city
emit("update:modelValue",city)
open.value = false

}

</script>

<template>

<div class="campo">

<label>Destino</label>

<input
v-model="search"
placeholder="¿A dónde vas?"
@focus="open=true"
/>

<div v-if="open" class="dropdown">

<div
v-for="city in filtered"
:key="city"
class="item"
@click="selectCity(city)"
>

{{ city }}

</div>

</div>

</div>

</template>

<style scoped>

.campo{
display:flex;
flex-direction:column;
padding:10px 18px;
border-right:1px solid #eee;
width:240px;
position:relative;
}

input{
border:none;
outline:none;
font-size:14px;
color:#555;
font-family:'Gotham-Rounded-Book';
}

.dropdown{
position:absolute;
top:70px;
left:0;
width:240px;
background:white;
border-radius:10px;
box-shadow:0 10px 30px rgba(0,0,0,.15);
}

.item{
padding:10px;
cursor:pointer;
}

.item:hover{
background:#f5f5f5;
}

</style>