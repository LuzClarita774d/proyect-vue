import { reglamentosData } from '../data/reglamentos.js'; 

export const reglamentoService = {
  async getReglamentosByPropertyId(propertyId) {
    try {
      // Buscamos el array que corresponde a ese ID
      // Si no existe, devolvemos un array vacío
      return reglamentosData[propertyId] || [];
    } catch (error) {
      console.error("Error al obtener reglamentos:", error);
      return [];
    }
  }
};