const NUMBER_OF_POKEMONS = 905

export async function getRandomPokemon() {
  const id = Math.floor(Math.random() * NUMBER_OF_POKEMONS);

  return getPokemon(id)
}

export async function getPokemon(id?: string | number) {
  return await fetch(
    `${process.env.API_URL}/${id}`
  ).then((res) => res.json());
}
