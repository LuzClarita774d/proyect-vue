<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-column">
          <h3 class="title-premium">Asistencia</h3>
          <ul>
            <li><a href="#">Centro de ayuda</a></li>
            <li><a href="#">AirCover</a></li>
            <li><a href="#">Antidiscriminación</a></li>
            <li><a href="#">Apoyo a personas con discapacidad</a></li>
            <li><a href="#">Opciones de cancelación</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="title-premium">Modo anfitrión</h3>
          <ul>
            <li><a href="#">Pon tu espacio en Travel & Live</a></li>
            <li><a href="#">AirCover para anfitriones</a></li>
            <li><a href="#">Recursos para anfitriones</a></li>
            <li><a href="#">Foro comunitario</a></li>
            <li><a href="#">Anfitriona de forma responsable</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="title-premium">Travel & Live</h3>
          <ul>
            <li><a href="#">Newsroom</a></li>
            <li><a href="#">Funciones nuevas</a></li>
            <li><a href="#">Inversionistas</a></li>
            <li><a href="#">Tarjetas de regalo</a></li>
            <li><a href="#">Emergencia climática</a></li>
          </ul>
        </div>
      </div>

      <hr class="footer-divider" />

      <div class="footer-bottom">
        <div class="footer-legal">
          <p class="brand">© 2026 TRAVEL & LIVE</p>
          <span class="dot">·</span>
          <a href="#">Privacidad</a>
          <span class="dot">·</span>
          <a href="#">Términos</a>
          <span class="dot">·</span>
          <a href="#">Mapa del sitio</a>
        </div>


      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
 
  background-color: #152644; 
  padding: 60px 0 30px 0;
  color: #FFFFFF; 
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 48px;
}


.title-premium {
  font-family: 'Gotham-Rounded-Light', sans-serif;
  color: #FC8312; 
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 14px;
}


.footer-column a {
  font-family: 'Poppins-Light', sans-serif;
  text-decoration: none;
  color: #FFFFFF;
  font-size: 14px;
  opacity: 0.85;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.footer-column a:hover {
  opacity: 1;
  color: #FC8312; 
}

.footer-divider {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-legal {
  font-family: 'Poppins-Medium', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #FFFFFF;
}

.footer-legal a {
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Poppins-Light', sans-serif;
}

.dot {
  color: #FC8312;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 30px;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-util {
  background: none;
  border: none;
  font-family: 'Poppins-Medium', sans-serif;
  font-size: 14px;
  cursor: pointer;
  color: #FFFFFF;
  padding: 0;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-icon {
  font-family: 'Poppins-Medium', sans-serif;
  font-size: 14px;
  text-decoration: none;
  color: #FC8312;
}

/* Responsivo */
@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column-reverse;
    text-align: center;
  }

  .footer-legal {
    flex-direction: column;
    gap: 8px;
  }

  .dot {
    display: none;
  }
}
</style>