<script setup>
import { ref, computed } from "vue"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

const open = ref(false)

const adults = ref(1)
const kids = ref(0)
const babies = ref(0)


const totalGuests = computed(() => adults.value + kids.value)


const guestText = computed(() => {
  if(totalGuests.value === 1){
    return "1 huésped"
  }else{
    return totalGuests.value + " huéspedes"
  }
})

function update(){
  emit("update:modelValue", totalGuests.value)
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

<div class="campo" @mouseenter="open=true" @mouseleave="open=false">

<label>Huéspedes</label>

<div class="texto">
{{ guestText }}
</div>

<div 
v-if="open" 
class="panel"
@mouseenter="open=true"
@mouseleave="open=false"
>

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

<div class="fila">

<div>
<strong>Bebés</strong>
<p>Menos de 2 años</p>
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
padding:14px 22px;
width:220px;
cursor:pointer;
position:relative;
opacity:.75;
transition:.25s;
}

.campo:hover{
background:#f2f2f2;
border-radius:40px;
opacity:1;
}

.campo label{
font-size:14px;
font-family:'Poppins-Regular';
}

.texto{
font-size:15px;
color:#969393;
 font-family:'Poppins-Regular';
}

.panel{
position:absolute;
top:75px;
left:0;
background:white;
border-radius:20px;
box-shadow:0 20px 40px rgba(0,0,0,.15);
padding:25px;
width:330px;

z-index:9999;
}

.fila{
display:flex;
justify-content:space-between;
align-items:center;
font-size:14px;

margin-bottom:15px;
}

 strong{
  font-family:'Poppins-Regular';
}


.contador{
display:flex;
gap:10px;
 font-family:'Poppins-Regular';
align-items:center;
}

button{
width:32px;
height:32px;
border-radius:50%;
border:1px solid #ddd;
background:white;
cursor:pointer;
font-size:18px;
transition:.2s;
}

button:hover{
background:#f2f2f2;
}

</style>