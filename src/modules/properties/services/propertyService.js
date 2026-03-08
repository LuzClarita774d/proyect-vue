import { properties } from "../data/properties"

export function searchProperties(filters) {

  return properties.filter(property => {

    const destination = filters.destination?.toLowerCase() || ""

    const destinationMatch =
      !destination ||
      property.city.toLowerCase().includes(destination) ||
      property.location.toLowerCase().includes(destination)

    const guestsMatch =
      property.maxGuests >= filters.guests

    const dateMatch =
      !filters.checkIn ||
      !filters.checkOut ||
      property.availability.some(range => {
        return (
          filters.checkIn >= range.from &&
          filters.checkOut <= range.to
        )
      })

    return destinationMatch && guestsMatch && dateMatch
  })
}