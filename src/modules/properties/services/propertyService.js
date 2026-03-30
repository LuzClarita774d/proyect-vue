import { properties } from "../data/properties"

/* OBTENER PROPIEDAD POR ID */
export function getPropertyById(id){
  return properties.find(property => property.id == id)
}

/* BUSQUEDA DE PROPIEDADES */
export function searchProperties(filters){

  return properties.filter(property => {

    const destination = filters.destination?.toLowerCase() || ""

    /* DESTINO */
    const destinationMatch =
      !destination ||
      property.city.toLowerCase().includes(destination) ||
      property.location.toLowerCase().includes(destination)

    /* HUÉSPEDES */
    const guestsMatch =
      property.maxGuests >= filters.guests

  
    let dateMatch = true

    /* FECHAS */
    if(filters.checkIn && filters.checkOut){

      const start = new Date(filters.checkIn)
      const end = new Date(filters.checkOut)

      const nights =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24))

      dateMatch = property.availability?.some(range => {

        const availableStart = new Date(range.from)
        const availableEnd = new Date(range.to)

        const withinRange =
          start >= availableStart &&
          end <= availableEnd

        const enoughNights =
          (availableEnd - availableStart) / (1000 * 60 * 60 * 24) >= nights

        return withinRange && enoughNights

      }) || false
    }

    return destinationMatch && guestsMatch && dateMatch

  })

}