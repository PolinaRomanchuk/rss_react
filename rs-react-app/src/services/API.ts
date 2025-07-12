interface PokemonData {
  pokemonName: string;
  description: string;
}

export async function fetchPokemon(
  url: string,
  name: string
): Promise<PokemonData> {
  try {
    const response = await fetch(`${url}/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error('Error fetching pokemon');
    }
    const data = await response.json();
    return {
      pokemonName: data.name,
      description: `Height: ${data.height}, Weight: ${data.weight}`,
    };
  } catch (error) {
    void error;
    return {
      pokemonName: '',
      description: '',
    };
  }
}
