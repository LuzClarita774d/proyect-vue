
export const hostsData = [
  {
    id: 2,
    name: "Judd Stephens",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    joinedDate: "Mayo 2024",
    responseTime: "en menos de una hora",
    telefono: "(422) 585-9895",
    correo: "judd.stephens@example.com",
    estudios: "Universidad Anáhuac Cancún",
    descripcion: "Me encanta el arte contemporáneo y la danza. Mi objetivo es que cada huésped viva una experiencia auténtica y llena de detalles.",
    responseRate: "100%",
    rating: 4.9,
    totalReviews: 128,
    languages: ["Español", "Inglés"]
  },
  {
    id: 3,
    name: "Adriana Montes",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    joinedDate: "Marzo 2023",
    responseTime: "en unos minutos",
    telefono: "(998) 123-4567",
    correo: "adriana.m@host.com",
    estudios: "Lic. en Gastronomía - UT",
    descripcion: "Chef de profesión y apasionada por la cultura maya. Te daré las mejores recomendaciones culinarias de la zona.",
    responseRate: "98%",
    rating: 4.8,
    totalReviews: 85,
    languages: ["Español", "Francés"]
  },
  {
    id: 4,
    name: "Carlos Villa",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    joinedDate: "Agosto 2023",
    responseTime: "en menos de una hora",
    telefono: "(55) 890-1234",
    correo: "carlos.villa@proyectos.com",
    estudios: "Ingeniería Civil - UNAM",
    descripcion: "Aficionado a la arquitectura y la historia. Mis propiedades reflejan la esencia del México moderno y acogedor.",
    responseRate: "100%",
    rating: 5.0,
    totalReviews: 210,
    languages: ["Español", "Alemán"]
  },
];

// Función para obtener uno por ID (útil para tu vista de detalle)
export const getHostById = (id) => hostsData.find(host => host.id === parseInt(id));