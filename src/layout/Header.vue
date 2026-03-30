<template>
    <header class="header">

      <div class="logo">
      <router-link :to="{ name: 'home' }">
        <img src="@/assets/imagenes/logos/logo.png" alt="logo"></router-link>
      </div>

      <div class="iconos">
        <div class="alfitrion">
          Convierte en alfitrión
        </div>
       
        <img class="menu" src="@/assets/imagenes/logos/hamburguesa.svg" alt="menu">
      </div>
    </header>
</template>

   


<script>
export default {
  name: "Header"
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

.menu{
  width:24px;
}



</style>