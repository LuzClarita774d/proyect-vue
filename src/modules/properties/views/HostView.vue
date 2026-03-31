<template>
  <section class="host">
    <h1 class="host-title">Conviértete en anfitrión</h1>

    <p class="host-description">
      Completa el siguiente formulario para registrar tu alojamiento y comenzar a recibir huéspedes.
    </p>

    <form @submit.prevent="submitForm" class="host-form">
      <div class="form-group">
        <label for="name">Nombre completo</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Tu nombre" />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input id="email" v-model="form.email" type="email" required placeholder="tu@correo.com" />
      </div>

      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input id="phone" v-model="form.phone" type="tel" required placeholder="(555) 123-4567" />
      </div>

      <div class="form-group">
        <label for="description">Descripción de tu alojamiento</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          required
          placeholder="Cuéntanos sobre tu propiedad"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Enviar solicitud</button>
    </form>

    <p v-if="submitted" class="confirmation">
      ¡Gracias! Tu solicitud para ser anfitrión ha sido enviada.
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Hero from '@/layout/Headerprincipal.vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  description: ''
})

const submitted = ref(false)

function submitForm() {
  // Aquí podrías enviar la info a un backend o API
  console.log('Solicitud enviada:', form.value)
  submitted.value = true

  // Limpiar formulario si quieres
  form.value = { name: '', email: '', phone: '', description: '' }
}
</script>

<style scoped>
.host {
  padding: 160px 80px 40px 80px;
  max-width: 700px;
  margin: 0 auto;
}

.host-title {
  font-size: 28px;
  color: #48427B;
  margin-bottom: 10px;
  font-family: 'Poppins-Medium';
  text-align: center;
}

.host-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
  text-align: center;
}

.host-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.submit-btn {
  padding: 12px;
  background-color: #152644;
  color: white;
  font-size: 16px;
  font-family: 'Poppins-Medium';
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #0f1d3a;
}

.confirmation {
  margin-top: 20px;
  font-size: 16px;
  color: green;
  text-align: center;
}
</style>