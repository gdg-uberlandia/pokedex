const getBgColor = () => {
  const colors = ["bg-devfest-blue", "bg-devfest-orange", "bg-devfest-red"];

  return colors[Math.floor(Math.random() * colors.length)];
};

export { getBgColor };
