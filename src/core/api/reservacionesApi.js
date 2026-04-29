import api from './axios'

const BASE = '/reservaciones-controller'

export const reservacionesApi = {

  getAll() {
    return api.get(`${BASE}/get/all`)
  },

  getById(id) {
    return api.get(`${BASE}/get/${id}`)
  },

  create(data) {
    return api.post(`${BASE}/new`, data)
  },

  update(id, data) {
    return api.put(`${BASE}/edit-user/${id}`, data)
  }
}
