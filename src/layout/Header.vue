<template>
  
    <header class="header">

      <div class="logo">
       <router-link to="/"><img src="@/assets/imagenes/logos/logo.svg" alt="logo"></router-link>
      </div>

      <div class="iconos">
        <div class="idiomas">
          MXN
          <img src="@/assets/imagenes/logos/Vector.svg" alt="">
        </div>
        <img class="usuario" src="@/assets/imagenes/logos/usuario.svg" alt="usuario">
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
  padding:15px 40px;
  border-bottom:1px solid #eee;
  background:#ffffff;
}

.logo img{
 
}

.iconos{
  display:flex;
  align-items:center;
  gap:20px;
}

.idiomas{
  display:flex;
  align-items:center;
  gap:6px;
  font-family:"Gotham Rounded Medium";
  color:#374564;
  cursor:pointer;
}

.usuario{
  width:24px;
}

.menu{
  width:24px;
}

</style>