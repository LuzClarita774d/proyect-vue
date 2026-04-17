
<script>
export default {
  name: "Header"
}
</script>


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
       
        <img class="menu" src="@/assets/imagenes/logos/hamburguesa.svg" alt="menu">
      </div>
    </header>
</template>

   




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

.menu{
  width:24px;
}



</style>