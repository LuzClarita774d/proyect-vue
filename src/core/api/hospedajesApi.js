import api from './axios'

const BASE = '/hospedajes-controller'

export const hospedajesApi = {

  /* Obtener todos los hospedajes */
  getAll() {
    return api.get(`${BASE}/get/all`)
  },

  /* Obtener hospedaje por ID */
  getById(id) {
    return api.get(`${BASE}/get/${id}`)
  },

  /* Crear nuevo hospedaje */
  create(data) {
    return api.post(`${BASE}/new`, data)
  },

  /* Actualizar hospedaje */
  update(id, data) {
    return api.put(`${BASE}/edit-user/${id}`, data)
  }
}
