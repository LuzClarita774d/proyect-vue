import { reactive, computed } from 'vue'

const state = reactive({
  usuario: JSON.parse(localStorage.getItem('usuario') || 'null'),
  token: localStorage.getItem('token') || null
})

export const authStore = {

  state,

  isAuthenticated: computed(() => !!state.usuario),

  usuario: computed(() => state.usuario),

  setUsuario(usuario) {
    state.usuario = usuario
    localStorage.setItem('usuario', JSON.stringify(usuario))
  },

  setToken(token) {
    state.token = token
    localStorage.setItem('token', token)
  },

  logout() {
    state.usuario = null
    state.token = null
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
  }
}
