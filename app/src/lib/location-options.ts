export type DistrictOption = {
  value: string;
  label: string;
};

export type CityOption = {
  value: string;
  label: string;
  districts: DistrictOption[];
};

export const cityOptions: CityOption[] = [
  {
    value: "sobral",
    label: "Sobral",
    districts: [
      { value: "centro", label: "Centro" },
      { value: "junco", label: "Junco" },
      { value: "campo-dos-velhos", label: "Campo dos Velhos" },
      { value: "dom-expedito", label: "Dom Expedito" },
    ],
  },
  {
    value: "forquilha",
    label: "Forquilha",
    districts: [
      { value: "centro", label: "Centro" },
      { value: "cidade-de-deus", label: "Cidade de Deus" },
    ],
  },
];