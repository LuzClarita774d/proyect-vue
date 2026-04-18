import { reglamentosData } from '../data/reglamentos.js'; 

export const reglamentoService = {
  async getReglamentosByPropertyId(propertyId) {
    try {
   
      return reglamentosData[propertyId] || [];
    } catch (error) {
      console.error("Error al obtener reglamentos:", error);
      return [];
    }
  }
};