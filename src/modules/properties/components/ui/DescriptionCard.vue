<script setup>
import { ref, computed, watch } from "vue"

/* PROPS AYUDA Q SE VEA  */
const props = defineProps({
  text: {
    type: String,
    default: ""
  }
})


const showModal = ref(false)


const isLong = computed(() => {
  return props.text && props.text.length > 400
})


function openModal(){
  showModal.value = true
  document.body.style.overflow = 'hidden' 
}

function closeModal(){
  showModal.value = false
  document.body.style.overflow = '' 
}
</script>

<template>
  <div class="description-card">

    <h3>Descripción del sitio</h3>

    <div class="text-container">
      <p class="description-text">
        {{ text }}
      </p>
    </div>

    <button 
      v-if="isLong"
      class="toggle-btn"
      @click="openModal"
    >
      Ver más
    </button>

  
    <div 
      v-if="showModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <div 
        class="modal"
        @click.stop
      >

        <div class="modal-header">
          <h3>Descripción del sitio</h3>
          <button class="close" @click="closeModal">✕</button>
        </div>

        <div class="modal-body">
          <p>{{ text }}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>

.description-card{
  margin-top: 20px;
  max-width: 600px;
}

.description-card h3{
  font-family: 'Poppins-Medium';
  color: #484769;
  margin-bottom: 10px;
}


.text-container{
  max-height: 200px; 
  overflow: hidden;
}

.description-text{
  font-family: 'Poppins-Regular';
  color: #484769;
  text-align: justify;
  line-height: 1.7;
  font-size: 15px;
}


.toggle-btn{
  margin-top: 10px;
  background: #1e90ff;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Poppins-Regular';
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.3s;
}
.toggle-btn:hover{
  background: #0f78d1;
}


.modal-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}


.modal{
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}


.modal::-webkit-scrollbar{
  width: 0;
  background: transparent;
}


.modal-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-header h3{
  font-family: 'Poppins-Medium';
  color: #484769;
}


.close{
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-body p{
  font-family: 'Poppins-Regular';
  color: #484769;
  text-align: justify;
  line-height: 1.7;
  max-height: 70vh; 
}
</style>