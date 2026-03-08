<template>

<div class="campo">

<label>Disponibilidad</label>

<div class="texto">
{{ checkIn || "Fechas disponibles" }}
</div>

</div>

</template>


<script setup>

defineProps({
checkIn:String,
checkOut:String
})

</script>

<style scoped>

.campo{

display:flex;
flex-direction:column;
padding:10px 18px;
border-right:1px solid #eee;
width:260px;
cursor:pointer;

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

.campo:hover{
background:#f7f7f7;
border-radius:30px;
}

</style>