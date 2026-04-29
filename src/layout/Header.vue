<template>
    <header class="header">

      <div class="logo">
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/imagenes/logos/logo.png" alt="logo"></router-link>
      </div>



            <div class="iconos">
      <!-- Aquí vinculamos al HostView -->
      <router-link :to="{ name: 'host' }" class="alfitrion">
        Convierte en anfitrión
      </router-link>

        <template v-if="usuario">
          <span class="user-name">{{ usuario.nombre }}</span>
          <button class="btn-logout" @click="logout">Salir</button>
        </template>

        <router-link v-else :to="{ name: 'login' }" class="btn-cuenta">
          Crear cuenta / Iniciar sesión
        </router-link>
       
        <img class="menu" src="@/assets/imagenes/logos/hamburguesa.svg" alt="menu">
      </div>
    </header>
</template>

   


<script setup>
import { useRouter } from 'vue-router'
import { authStore } from '@/core/auth/authStore'
import { computed } from 'vue'

const router = useRouter()
const usuario = computed(() => authStore.usuario.value)

function logout() {
  authStore.logout()
  router.push({ name: 'home' })
}
</script>


<style scoped>

.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 22px 30px;

  background:#152644;
}



.iconos{
  display:flex;
  align-items:center;
  gap:20px;
}

.alfitrion
{
  display:flex;
  align-items:center;
  gap:6px;
  font-size: 15px;
 font-family:'Poppins-Regular';
  color:#ffffff;
  cursor:pointer;
}

.user-name {
  font-family: 'Poppins-Regular';
  font-size: 14px;
  color: #fff;
}

.btn-logout {
  font-family: 'Poppins-Regular';
  font-size: 13px;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-logout:hover {
  background: rgba(255,255,255,0.15);
}

.btn-cuenta {
  font-family: 'Poppins-Regular';
  font-size: 13px;
  color: #152644;
  background: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cuenta:hover {
  background: #e0e0e0;
}

.menu{
  width:24px;
}



</style>