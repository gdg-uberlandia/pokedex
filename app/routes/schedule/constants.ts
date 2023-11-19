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
  minas: {
    label: "Minas",
    bgColor: "bg-devfest-blue",
    color: "text-white",
  },
  curado: {
    label: "Curado",
    bgColor: "bg-devfest-red",
    color: "text-white",
  },
  canastra: {
    label: "Canastra",
    bgColor: "bg-devfest-orange",
    color: "text-white",
  },
  comunidade: {
    label: "Comunidade",
    bgColor: "bg-black",
    color: "text-white",
  },
};

export { evaluationsColors, evaluations, paths };
