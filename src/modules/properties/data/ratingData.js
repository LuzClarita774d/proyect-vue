// src/modules/properties/data/ratingData.js

export const ratings = [
  {
    propertyId: "3",
    overallRating: 4.8,
    totalReviews: 4,
    categories: {
      limpieza: 4.9,
      veracidad: 4.9,
      llegada: 4.9,
      comunicacion: 4.9,
      ubicacion: 4.9
    },
    reviews: [
      {
        id: 1,
        userName: "Lalo",
        userCity: "Ciudad de México, México",
        userImage: "https://randomuser.me/api/portraits/men/1.jpg",
        date: "marzo de 2026",
        stayDuration: "Estancia de una noche",
        rating: 5,
        comment: "Muy buen lugar no hay tanto ruido como en un hotel qué me quedé en la misma cuadra, la regadera no sé regula bien o sale Muy caliente o Muy fria. las almohadas no son muy cómodas. Fuera de eso gran zona, muy buen espacio."
      },
      {
        id: 2,
        userName: "Delfino",
        userCity: "Heroica Veracruz, México",
        userImage: "https://randomuser.me/api/portraits/men/2.jpg",
        date: "febrero de 2026",
        stayDuration: "Estancia de varias noches",
        rating: 4,
        comment: "Cuando llegue el señor que me recibió fue muy amable, al otro día estaba otro señor al que le pedí la plancha y es un poco más seco como enojado hasta pena me daba cuando bajaba..."
      },
            {
        id: 3,
        userName: "Lalo",
        userCity: "Ciudad de México, México",
        userImage: "https://randomuser.me/api/portraits/men/1.jpg",
        date: "marzo de 2026",
        stayDuration: "Estancia de una noche",
        rating: 5,
        comment: "Muy buen lugar no hay tanto ruido como en un hotel qué me quedé en la misma cuadra, la regadera no sé regula bien o sale Muy caliente o Muy fria. las almohadas no son muy cómodas. Fuera de eso gran zona, muy buen espacio."
      },
      {
        id: 4,
        userName: "Delfino",
        userCity: "Heroica Veracruz, México",
        userImage: "https://randomuser.me/api/portraits/men/2.jpg",
        date: "febrero de 2026",
        stayDuration: "Estancia de varias noches",
        rating: 4,
        comment: "Cuando llegue el señor que me recibió fue muy amable, al otro día estaba otro señor al que le pedí la plancha y es un poco más seco como enojado hasta pena me daba cuando bajaba..."
      }
      // Agrega más objetos aquí para probar el límite de 10
    ]
  }
];