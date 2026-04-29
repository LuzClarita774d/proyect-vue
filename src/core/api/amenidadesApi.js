import api from './axios'

const BASE = '/amenidades-controller'

export const amenidadesApi = {

  /* Obtener todas las amenidades */
  getAll() {
    return api.get(`${BASE}/get/all`)
  },

  /* Obtener amenidad por ID */
  getById(id) {
    return api.get(`${BASE}/get/${id}`)
  },

  /* Crear nueva amenidad */
  create(data) {
    return api.post(`${BASE}/new`, data)
  },

  /* Actualizar amenidad */
  update(id, data) {
    return api.put(`${BASE}/edit-user/${id}`, data)
  }
}
