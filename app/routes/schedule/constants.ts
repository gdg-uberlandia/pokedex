const evaluationsColors = [
  "hover:bg-devfest-blue",
  "hover:bg-devfest-red",
  "hover:bg-devfest-orange",
  "hover:bg-black",
];

const evaluations = [
  {
    score: 0,
    label: "Ruim",
  },
  {
    score: 1,
    label: "Regular",
  },
  {
    score: 2,
    label: "Bom",
  },
  {
    score: 3,
    label: "Excelente",
  },
];

const paths = {
  MINAS: {
    label: "Minas",
    bgColor: "bg-devfest-blue",
    color: "text-white",
  },
  CURADO: {
    label: "Curado",
    bgColor: "bg-devfest-red",
    color: "text-white",
  },
  CANASTRA: {
    label: "Canastra",
    bgColor: "bg-devfest-orange",
    color: "text-white",
  },
  COMUNIDADE: {
    label: "Comunidade",
    bgColor: "bg-black",
    color: "text-white",
  },
};

export { evaluationsColors, evaluations, paths };
