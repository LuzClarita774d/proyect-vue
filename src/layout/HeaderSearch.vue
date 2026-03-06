<template>

<header class="header">

  <div class="logo">
    <router-link to="/">
      <img src="@/assets/imagenes/logos/logo.svg" alt="logo">
    </router-link>
  </div>

  <!-- BUSCADOR -->
  <div class="search-box">

    <div class="search-item">
      <img src="@/assets/imagenes/logos/vector.svg">
      <span>Buscar destinos</span>
    </div>

    <div class="search-item">
      <img src="@/assets/imagenes/logos/calendario.svg">
      <span>Disponibilidad</span>
    </div>

    <div class="search-item">
      <img src="@/assets/imagenes/logos/usuarioicon.svg">
      <span>Huéspedes</span>
    </div>

    <div class="search-button">
      <img src="@/assets/imagenes/logos/lupa.svg">
    </div>

  </div>

  <div class="iconos">
    <div class="idiomas">
      MXN
      <img src="@/assets/imagenes/logos/Vector.svg">
    </div>

    <img class="usuario" src="@/assets/imagenes/logos/usuario.svg">
    <img class="menu" src="@/assets/imagenes/logos/hamburguesa.svg">
  </div>

</header>

</template>

<style scoped>

.header{
display:flex;
align-items:center;
justify-content:space-between;
padding:15px 40px;
border-bottom:1px solid #eee;
background:white;
}

.search-box{
display:flex;
align-items:center;
gap:10px;
background:#F2F8FF;
padding:8px 12px;
border-radius:12px;
}

.search-item{
display:flex;
align-items:center;
gap:6px;
font-family:"Gotham Rounded Book";
color:#374564;
}

.search-item img{
width:18px;
}

.search-button{
width:35px;
height:35px;
background:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
}

.iconos{
display:flex;
align-items:center;
gap:20px;
}

.usuario,.menu{
width:24px;
}

</style>