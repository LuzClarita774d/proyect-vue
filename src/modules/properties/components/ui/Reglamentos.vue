<template>
  <section class="reglamentos-container">
    <div class="reglamentos-grid">
      <article v-for="item in reglamentos" :key="item.id" class="reglamento-card">
        <div class="card-header">
          <h2 class="reglamento-titulo">{{ item.titulo }}</h2>
          <div class="linea-decorativa"></div>
        </div>
        
        <p class="reglamento-desc">{{ item.descripcion }}</p>
        
        <ul class="reglamento-lista">
          <li v-for="(punto, index) in item.puntos" :key="index" class="reglamento-item">
            <span class="bullet-premium"></span>
            <span class="punto-texto">{{ punto }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { reglamentoService } from '@/modules/properties/services/reglamentoService'; 

const props = defineProps({
  propertyId: {
    type: [String, Number],
    required: true
  }
});

const reglamentos = ref([]);

const fetchReglamentos = async () => {
  reglamentos.value = await reglamentoService.getReglamentosByPropertyId(props.propertyId);
};

onMounted(fetchReglamentos);

// Por si el usuario cambia de propiedad sin recargar la página
watch(() => props.propertyId, fetchReglamentos);
</script>

<style scoped>
.reglamentos-container {
  padding: 20px 0; 
  width: 100%;
}

.reglamentos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 60px; 
}

.reglamento-card {
  background: transparent;
  padding: 0;
}

.reglamento-titulo {
   font-family:'Poppins-Regular';
  font-size: 20px;
  color: #484769; 
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.linea-decorativa {
  width: 40px;
  height: 2px;
  background-color: #012556; 
  margin-bottom: 20px;
}

.reglamento-desc {
  font-family:'Poppins-Regular';
  font-size: 15px;
  color: #67668C;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 90%; 
}

.reglamento-lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reglamento-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  font-family: 'Poppins-Light';
  font-size: 15px;
  color: #484769;
}

.bullet-premium {
  min-width: 8px;
  height: 8px;
  /* Punto lleno */
  background-color: #012556; 
  border-radius: 50%;
  margin-top: 7px;
}

.punto-texto {
  line-height: 1.5;
}

@media (max-width: 768px) {
  .reglamentos-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>