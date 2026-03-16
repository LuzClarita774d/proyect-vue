<script setup>

import { ref, watch, computed } from "vue"
import { VueDatePicker } from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const props = defineProps({
checkIn:String,
checkOut:String
})

const emit = defineEmits([
"update:checkIn",
"update:checkOut"
])

const range = ref([])

watch(
()=>[props.checkIn,props.checkOut],
([start,end])=>{

if(start && end){
range.value=[new Date(start),new Date(end)]
}

},
{immediate:true}
)

const nights = computed(()=>{

if(range.value && range.value.length===2){

const start=range.value[0]
const end=range.value[1]

const diff=end-start
return Math.ceil(diff/(1000*60*60*24))

}

return 0

})

watch(range,(val)=>{

if(val && val.length===2){

const start=val[0].toISOString().split("T")[0]
const end=val[1].toISOString().split("T")[0]

emit("update:checkIn",start)
emit("update:checkOut",end)

}

})


function formatDate(date){

const months = [
"ene","feb","mar","abr","may","jun",
"jul","ago","sep","oct","nov","dic"
]

const d = new Date(date)

return `${d.getDate()} ${months[d.getMonth()]}`

}

</script>


<template>

<div class="campo">

<label>Agenda</label>

<VueDatePicker
ref="dp"
v-model="range"
range
:enable-time-picker="false"
:min-date="new Date()"
:multi-calendars="2"
auto-apply
>

<template #trigger>

<div class="fake-input">

<span v-if="!range.length">
Día de llegada - Día de salida
</span>

<span v-if="range.length===1">
Selecciona día de salida
</span>

<span v-if="range.length===2">
{{ formatDate(range[0]) }} - {{ formatDate(range[1]) }}
</span>

</div>

</template>

</VueDatePicker>

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
transition:.25s;
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

.fake-input{
font-size:15px;
color:#969393;
margin-top:2px;
font-family:'Poppins-Regular';
cursor:pointer;
}



.dp__menu{
border-radius:18px !important;
box-shadow:0 20px 40px rgba(0,0,0,.15) !important;
font-family:'Poppins-Regular';
}

.dp__active_date{
background:#ddd !important;
color:black;
}

.dp__range_start,
.dp__range_end{
background:#ddd !important;
}

</style>