import { properties } from "../data/properties"
import { DISPONIBILIDAD_DATA } from "../data/disponibilidad" // <--- Importamos la nueva data

/* OBTENER PROPIEDAD POR ID */
export function getPropertyById(id){
  return properties.find(property => property.id == id)
}

/* BUSQUEDA DE PROPIEDADES CORREGIDA */
export function searchProperties(filters){
  return properties.filter(property => {
    
    // 1. FILTRO DE DESTINO
    const destination = filters.destination?.toLowerCase() || ""
    const destinationMatch =
      !destination ||
      property.city.toLowerCase().includes(destination) ||
      property.location.toLowerCase().includes(destination)

    // 2. FILTRO DE HUÉSPEDES
    const guestsMatch = property.maxGuests >= (filters.guests || 1)

    // 3. FILTRO DE FECHAS (CONECTADO A DISPONIBILIDAD_DATA)
    let dateMatch = true
    if(filters.checkIn && filters.checkOut){
      const start = new Date(filters.checkIn)
      const end = new Date(filters.checkOut)
      
      // Buscamos la info de esta propiedad en el calendario global
      const info = DISPONIBILIDAD_DATA.find(d => d.propertyId === property.id)
      
      if (!info) {
        dateMatch = false // Si no hay info de disponibilidad, por seguridad no la mostramos
      } else {
        // La propiedad NO es apta si existe algún bloque "ocupado" que se cruce con las fechas del usuario
        const tieneBloqueo = info.calendario.some(bloque => {
          if (bloque.estado === 'libre') return false; // Si está libre, no nos estorba

          const bInicio = new Date(bloque.inicio)
          const bFin = new Date(bloque.fin)

          // Lógica de traslape: (InicioA <= FinB) Y (FinA >= InicioB)
          return start <= bFin && end >= bInicio
        })

        dateMatch = !tieneBloqueo // Si no tiene bloqueos, dateMatch es true
      }
    }

    return destinationMatch && guestsMatch && dateMatch
  })
}