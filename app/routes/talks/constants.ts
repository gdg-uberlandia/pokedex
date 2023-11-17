const evaluationsHoverBgColor = [
  "hover:bg-devfest-blue",
  "hover:bg-devfest-red",
  "hover:bg-devfest-orange",
  "hover:bg-black",
];

const evaluations = [
  {
    id: "1",
    value: "0",
    label: "Ruim",
  },
  {
    id: "2",
    value: "1",
    label: "Regular",
  },
  {
    id: "3",
    value: "2",
    label: "Bom",
  },
  {
    id: "4",
    value: "3",
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

export { evaluationsHoverBgColor, evaluations, paths };
