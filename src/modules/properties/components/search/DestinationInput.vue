<script setup>

defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

</script>

<template>

<div class="campo">

<label>Destino</label>

<input
:value="modelValue"
@input="emit('update:modelValue',$event.target.value)"
placeholder="¿A dónde vas?"
/>

</div>

</template>

<style scoped>

.campo{

display:flex;
flex-direction:column;

padding:10px 18px;
border-right:1px solid #eee;

width:240px;

}

label{
font-size:12px;
font-weight:600;
 font-family: 'Gotham-Rounded-Book';
}

input{
border:none;
outline:none;
font-size:14px;
color:#555;
font-family: 'Gotham-Rounded-Book';
}

.campo:hover{
background:#f7f7f7;
border-radius:30px;
}

</style>