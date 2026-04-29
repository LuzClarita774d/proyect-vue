import api from './axios'

const BASE = '/usuarios-controller'

export const usuariosApi = {

  /* Obtener todos los usuarios */
  getAll() {
    return api.get(`${BASE}/get/all`)
  },

  /* Obtener usuario por ID */
  getById(id) {
    return api.get(`${BASE}/get/${id}`)
  },

  /* Crear nuevo usuario */
  create(data) {
    return api.post(`${BASE}/new`, data)
  },

  /* Actualizar usuario */
  update(id, data) {
    return api.put(`${BASE}/edit-user/${id}`, data)
  },

  /* Login: busca usuario por correo y contraseña */
  async login(correo, contraseña) {
    const { data: usuarios } = await api.get(`${BASE}/get/all`)
    const usuario = usuarios.find(
      u => u.correo === correo && u.contraseña === contraseña
    )
    if (!usuario) {
      throw new Error('Correo o contraseña incorrectos')
    }
    return usuario
  }
}
