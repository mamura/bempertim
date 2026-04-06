export type MapBusiness = {
  id: number;
  name: string;
  category: string;
  phone: string;
  latitude: number;
  longitude: number;
};

export const sobralBusinesses: MapBusiness[] = [
  {
    id: 1,
    name: "Mercadinho do João",
    category: "Mercado",
    phone: "(88) 99999-1111",
    latitude: -3.6881,
    longitude: -40.3492,
  },
  {
    id: 2,
    name: "Salão Bela Vista",
    category: "Beleza",
    phone: "(88) 99999-2222",
    latitude: -3.6874,
    longitude: -40.3514,
  },
  {
    id: 3,
    name: "Lanchonete Sabor da Praça",
    category: "Alimentação",
    phone: "(88) 99999-3333",
    latitude: -3.6893,
    longitude: -40.3503,
  },
  {
    id: 4,
    name: "Pet Shop Amigo Fiel",
    category: "Pet",
    phone: "(88) 99999-4444",
    latitude: -3.6868,
    longitude: -40.3478,
  },
  {
    id: 5,
    name: "Oficina do Carlos",
    category: "Automotivo",
    phone: "(88) 99999-5555",
    latitude: -3.6901,
    longitude: -40.3521,
  },
];