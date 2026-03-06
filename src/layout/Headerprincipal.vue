<template>

<div class="hero">

  <div class="imagen-hero">

    <img src="@/assets/imagenes/properties/casa1.png" alt="casa">

    <!-- CAJA BUSCADOR -->
    <div class="caja-buscador">

      <!-- DESTINO -->
      <div class="item-busqueda">

        <p>Destino</p>

        <div class="input-busqueda">
          <img class="icono" src="@/assets/imagenes/logos/flechas.svg">
          <span>Buscar destinos</span>
        </div>

      </div>


      <!-- FECHAS -->
      <div class="item-busqueda">

        <p>Fechas</p>

        <div class="input-busqueda pequeno">
          <img class="icono" src="@/assets/imagenes/logos/calendario.svg">
          <span>Disponibilidad</span>
        </div>

      </div>


      <!-- HUESPEDES -->
      <div class="item-busqueda">

        <p>Huéspedes</p>

        <div class="input-busqueda mediano">
          <img class="icono" src="@/assets/imagenes/logos/usuarioicon.svg">
          <span>Huéspedes</span>
        </div>

      </div>


      <!-- BOTON BUSCAR -->
      <div class="boton-buscar">
        <img class="icono" src="@/assets/imagenes/logos/lupa.svg">
      </div>

    </div>

  </div>

</div>

</template>


<script>
export default {
  name: "Hero"
}
</script>


<style scoped>

/* CONTENEDOR HERO */

.imagen-hero{
  width:1500px;
  height:405px;
  position:relative;
}

.imagen-hero img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:0 0 40px 40px;
}


/* CAJA BUSCADOR */

.caja-buscador{
  position:absolute;
  bottom:-70px;
  left:50%;
  transform:translateX(-50%);

  width:1053px;
  height:153.47px;

  background:#F2F8FF;
  border-radius:20px;

  display:flex;
  align-items:center;
  justify-content:center;
  gap:20px;

  box-shadow:0 4px 10px rgba(0,63,156,0.12);
}


/* TITULO DE CADA CAMPO */

.item-busqueda p{
  font-family:'Gotham-Rounded-Book';
  font-size:12px;
  color:#374564;
  margin-bottom:8px;
}


/* INPUT BUSCADOR */

.input-busqueda{
  width:347px;
  height:48.1px;
  background:white;
  border-radius:10px;

  display:flex;
  align-items:center;
  gap:10px;

  padding:0 15px;

  font-family:'Exo-Medium';
  color:#6A63A1;
}

.input-busqueda.pequeno{
  width:215px;
}

.input-busqueda.mediano{
  width:223px;
}


.input-busqueda img{
  width:18px;
  object-fit:contain;
}
/* BOTON BUSCAR */

.boton-buscar{
  margin-top: 30px;
  width:45px;
  height:45px;

  background:white;
  border-radius:50%;

  display:flex;
  align-items:center;
  justify-content:center;

  cursor:pointer;
}

.boton-buscar img {
  width:25px;
  height: 25px;
}

</style>