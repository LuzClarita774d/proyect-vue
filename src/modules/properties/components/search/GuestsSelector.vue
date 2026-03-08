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

</script>


<template>

<div class="campo" @click="open = !open">

<label>Huéspedes</label>

<div class="texto">

{{ adults + kids }} huéspedes

</div>


<div v-if="open" class="panel">

<div class="fila">

<div>
<strong>Adultos</strong>
<p>13 años o más</p>
</div>

<div class="contador">

<button @click.stop="adults--">-</button>
<span>{{ adults }}</span>
<button @click.stop="adults++; update()">+</button>

</div>

</div>


<div class="fila">

<div>
<strong>Niños</strong>
<p>De 2 a 12 años</p>
</div>

<div class="contador">

<button @click.stop="kids--">-</button>
<span>{{ kids }}</span>
<button @click.stop="kids++; update()">+</button>

</div>

</div>


<div class="fila">

<div>
<strong>Bebés</strong>
<p>Menos de 2</p>
</div>

<div class="contador">

<button @click.stop="babies--">-</button>
<span>{{ babies }}</span>
<button @click.stop="babies++">+</button>

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
 font-family: 'Gotham-Rounded-Book';
}

.texto{
font-size:14px;
color:#555;
 font-family: 'Gotham-Rounded-Book';
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
 font-family: 'Gotham-Rounded-Book';
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