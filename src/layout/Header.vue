<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">TRAVEL & LIVE</router-link>
    </div>

    <div class="nav-center">
      <div class="search-bar">
        <input type="text" placeholder="Buscar destinos" />
        <input type="text" placeholder="Fechas" />
        <input type="text" placeholder="Huéspedes" />
        <div class="search">
        <img src="@/assets/imagenes/logos/casita.png" alt="Logo Casita" class="casita" />
      </div>
      </div>
    </div>

    <div class="nav-right">
      <button class="host-btn">Conviértete en anfitrión</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  border-bottom: 1px solid #eee;
  background: white;
}

.logo a {
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: #ff385c;
}

.search-bar {
  display: flex;
  background: #f7f7f7;
  border-radius: 30px;
  padding: 5px;
  gap: 10px;
}

.search-bar input {
  border: none;
  background: transparent;
  padding: 8px;
  outline: none;
}

.search-bar button {

  border: none;
  cursor: pointer;
}

.casita{
  width: 32px;
  height: auto;
  object-fit: contain;
}
.host-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
}
</style>