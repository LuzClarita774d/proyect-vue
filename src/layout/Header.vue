<template>
  
    <header class="header">

      <div class="logo">
       <router-link to="/"><img src="@/assets/imagenes/logos/logo.svg" alt="logo"></router-link>
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
  border-bottom:1px solid #eee;
  background:#ffffff;
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
 font-family: 'Gotham-Rounded-Book';
  color:#374564;
  cursor:pointer;
}

.menu{
  width:24px;
}



</style>