<script setup>

import { ref, computed } from "vue"
import { properties } from "@/modules/properties/data/properties"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

const open = ref(false)
const search = ref("")

const cities = [...new Set(properties.map(p => p.city))]

const filtered = computed(()=>{

if(!search.value) return cities.slice(0,10)

return cities
.filter(c =>
c.toLowerCase().includes(search.value.toLowerCase())
)
.slice(0,10)

})

function selectCity(city){

search.value = city
emit("update:modelValue",city)
open.value = false

}




</script>


<template>

<div class="campo" @mouseenter="open=true" @mouseleave="open=false">

<label>Destino</label>

<input
v-model="search"
placeholder="¿A dónde vas?"
@focus="open=true"
@blur="closeDropdown"
/>

<div v-if="open" class="dropdown">

<div class="suggest">
Destinos sugeridos
</div>

<div class="list">

<div
v-for="city in filtered"
:key="city"
class="item"
@click="selectCity(city)"
>
📍 {{ city }}
</div>

</div>

</div>

</div>

</template>


<style scoped>
.campo{
display:flex;
flex-direction:column;
padding:14px 22px;
border-right:1px solid #e5e5e5;
width:260px;
position:relative;
font-family:'Poppins-Regular';
transition:all .25s ease;
opacity:.75;

}

.campo:hover{
background:#f2f2f2;
border-radius:40px;
opacity:1;
}

.campo label{
font-size:14px;
color:#111;
}

.campo input{
border:none;
outline:none;
font-size:15px;
font-family:'Poppins-Regular';
color:#111;
background:transparent;
}

.dropdown{
position:absolute;
top:75px;
left:0;
width:260px;
background:white;
border-radius:16px;
box-shadow:0 15px 35px rgba(0,0,0,.12);
padding:10px 0;
z-index:9999;


overflow:hidden; 
}

.list{
max-height:220px;
overflow-y:auto;
}

.list::-webkit-scrollbar{
width:6px;
}

.list::-webkit-scrollbar-thumb{
background:#ccc;
border-radius:10px;
}

.suggest{
font-size:12px;
color:#666;
padding:10px 15px;
}

.item{
padding:12px 15px;
cursor:pointer;
transition:.2s;
color:#222;
}

.item:hover{
background:#f2f2f2;
}

</style>