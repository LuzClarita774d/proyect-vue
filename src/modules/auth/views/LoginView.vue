<template>
  <div class="login-page">

    <div class="login-card">

      <div class="login-header">
        <img src="@/assets/imagenes/logos/logo.png" alt="logo" class="login-logo">
        <h1>{{ isRegister ? 'Crear cuenta' : 'Iniciar sesión' }}</h1>
        <p>{{ isRegister ? 'Completa tus datos para registrarte' : 'Ingresa tus credenciales para continuar' }}</p>
      </div>

      <!-- ========== FORMULARIO LOGIN ========== -->
      <form v-if="!isRegister" @submit.prevent="handleLogin" class="login-form">

        <div class="form-group">
          <label for="correo">Correo electrónico</label>
          <input
            id="correo"
            v-model="correo"
            type="email"
            placeholder="ejemplo@correo.com"
            required
            autocomplete="email"
          >
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="contraseña"
            type="password"
            placeholder="Tu contraseña"
            required
            autocomplete="current-password"
          >
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>

        <p class="toggle-text">
          ¿No tienes cuenta?
          <a href="#" @click.prevent="isRegister = true">Regístrate aquí</a>
        </p>

      </form>

      <!-- ========== FORMULARIO REGISTRO ========== -->
      <form v-else @submit.prevent="handleRegister" class="login-form">

        <div class="form-group">
          <label for="reg-nombre">Nombre completo</label>
          <input
            id="reg-nombre"
            v-model="regNombre"
            type="text"
            placeholder="Tu nombre completo"
            required
          >
        </div>

        <div class="form-group">
          <label for="reg-correo">Correo electrónico</label>
          <input
            id="reg-correo"
            v-model="regCorreo"
            type="email"
            placeholder="ejemplo@correo.com"
            required
            autocomplete="email"
          >
        </div>

        <div class="form-group">
          <label for="reg-telefono">Teléfono</label>
          <input
            id="reg-telefono"
            v-model="regTelefono"
            type="number"
            placeholder="Tu número de teléfono"
          >
        </div>

        <div class="form-group">
          <label for="reg-password">Contraseña</label>
          <input
            id="reg-password"
            v-model="regContraseña"
            type="password"
            placeholder="Crea una contraseña"
            required
            autocomplete="new-password"
          >
        </div>

        <div class="form-group">
          <label for="reg-confirm">Confirmar contraseña</label>
          <input
            id="reg-confirm"
            v-model="regConfirm"
            type="password"
            placeholder="Repite tu contraseña"
            required
            autocomplete="new-password"
          >
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>
        <p v-if="success" class="success-msg">{{ success }}</p>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? 'Registrando...' : 'Crear cuenta' }}
        </button>

        <p class="toggle-text">
          ¿Ya tienes cuenta?
          <a href="#" @click.prevent="isRegister = false; error = ''; success = ''">Inicia sesión</a>
        </p>

      </form>

    </div>

  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usuariosApi } from '@/core/api/usuariosApi'
import { authStore } from '@/core/auth/authStore'

const router = useRouter()

/* Estado compartido */
const error = ref('')
const success = ref('')
const loading = ref(false)
const isRegister = ref(false)

/* Campos Login */
const correo = ref('')
const contraseña = ref('')

/* Campos Registro */
const regNombre = ref('')
const regCorreo = ref('')
const regTelefono = ref(null)
const regContraseña = ref('')
const regConfirm = ref('')


async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    const usuario = await usuariosApi.login(correo.value, contraseña.value)
    authStore.setUsuario(usuario)
    router.push({ name: 'home' })
  } catch (e) {
    error.value = e.message || 'Error al conectar con el servidor'
  } finally {
    loading.value = false
  }
}


async function handleRegister() {
  error.value = ''
  success.value = ''

  if (regContraseña.value !== regConfirm.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  loading.value = true

  try {
    const nuevoUsuario = {
      nombre: regNombre.value,
      correo: regCorreo.value,
      contraseña: regContraseña.value,
      telefono: regTelefono.value ? Number(regTelefono.value) : null,
      status: true
    }

    await usuariosApi.create(nuevoUsuario)
    success.value = '¡Cuenta creada exitosamente! Ya puedes iniciar sesión.'

    /* Limpiar campos de registro */
    regNombre.value = ''
    regCorreo.value = ''
    regTelefono.value = null
    regContraseña.value = ''
    regConfirm.value = ''

    /* Cambiar a login después de 2 segundos */
    setTimeout(() => {
      isRegister.value = false
      success.value = ''
    }, 2000)
  } catch (e) {
    error.value = e.response?.data?.message || e.message || 'Error al registrar usuario'
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #152644 0%, #2a4a7f 100%);
  padding: 20px;
}

.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  max-width: 160px;
  margin-bottom: 20px;
}

.login-header h1 {
  font-family: 'Poppins-Regular', sans-serif;
  font-size: 24px;
  color: #152644;
  margin: 0 0 6px 0;
}

.login-header p {
  font-family: 'WorkSans', sans-serif;
  font-size: 14px;
  color: #888;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-family: 'Poppins-Regular', sans-serif;
  font-size: 13px;
  color: #48427B;
  font-weight: 500;
}

.form-group input {
  padding: 12px 16px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'WorkSans', sans-serif;
  transition: border-color 0.2s;
  outline: none;
}

.form-group input:focus {
  border-color: #48427B;
}

.error-msg {
  color: #e53935;
  font-size: 13px;
  font-family: 'WorkSans', sans-serif;
  text-align: center;
  margin: 0;
}

.success-msg {
  color: #2e7d32;
  font-size: 13px;
  font-family: 'WorkSans', sans-serif;
  text-align: center;
  margin: 0;
}

.toggle-text {
  font-family: 'WorkSans', sans-serif;
  font-size: 13px;
  color: #888;
  text-align: center;
  margin: 0;
}

.toggle-text a {
  color: #48427B;
  font-weight: 600;
  text-decoration: none;
}

.toggle-text a:hover {
  text-decoration: underline;
}

.btn-login {
  padding: 14px;
  background: #152644;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Poppins-Regular', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-login:hover {
  background: #2a4a7f;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>
