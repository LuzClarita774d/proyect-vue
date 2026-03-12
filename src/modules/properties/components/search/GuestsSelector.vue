<script setup>

import { ref } from "vue"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

const open = ref(false)

const adults = ref(1)
const kids = ref(0)
const babies = ref(0)

function update(){
  emit("update:modelValue", adults.value + kids.value)
}

function addAdults(){
  adults.value++
  update()
}

function minusAdults(){
  if(adults.value > 1){
    adults.value--
    update()
  }
}

function addKids(){
  kids.value++
  update()
}

function minusKids(){
  if(kids.value > 0){
    kids.value--
    update()
  }
}

function addBabies(){
  babies.value++
}

function minusBabies(){
  if(babies.value > 0){
    babies.value--
  }
}

</script>


<template>

<div class="campo" @click="open = !open">

<label>Huéspedes</label>

<div class="texto">
{{ adults + kids }} huéspedes
</div>

<div v-if="open" class="panel">

<!-- ADULTOS -->

<div class="fila">

<div>
<strong>Adultos</strong>
<p>13 años o más</p>
</div>

<div class="contador">

<button @click.stop="minusAdults">-</button>
<span>{{ adults }}</span>
<button @click.stop="addAdults">+</button>

</div>

</div>

<!-- NIÑOS -->

<div class="fila">

<div>
<strong>Niños</strong>
<p>De 2 a 12 años</p>
</div>

<div class="contador">

<button @click.stop="minusKids">-</button>
<span>{{ kids }}</span>
<button @click.stop="addKids">+</button>

</div>

</div>

<!-- BEBES -->

<div class="fila">

<div>
<strong>Bebés</strong>
<p>Menos de 2</p>
</div>

<div class="contador">

<button @click.stop="minusBabies">-</button>
<span>{{ babies }}</span>
<button @click.stop="addBabies">+</button>

</div>

</div>

</div>

</div>

</template>


<style scoped>

.campo{
display:flex;
flex-direction:column;
padding:10px 18px;
width:200px;
cursor:pointer;
position:relative;
}

.campo:hover{
background:#f7f7f7;
border-radius:30px;
}

label{
font-size:12px;
font-weight:600;
font-family:'Gotham-Rounded-Book';
}

.texto{
font-size:14px;
color:#555;
font-family:'Gotham-Rounded-Book';
}

.panel{
position:absolute;
top:70px;
left:0;
background:#ffffff;
border-radius:20px;
box-shadow:0 15px 30px rgba(0,0,0,0.15);
padding:20px;
width:320px;
}

.fila{
display:flex;
justify-content:space-between;
align-items:center;
font-family:'Gotham-Rounded-Book';
font-size:14px;
margin-bottom:15px;
}

.contador{
display:flex;
gap:10px;
align-items:center;
}

button{
width:30px;
height:30px;
border-radius:50%;
border:1px solid #ccc;
background:#e3e3e3;
cursor:pointer;
}

</style>