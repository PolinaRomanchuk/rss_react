const URL = 'https://pokeapi.co/api/v2/pokemon';

interface PokemonData {
  pokemons: { pokemonName: string; description: string }[];
}

export async function fetchPokemonByName(name: string): Promise<PokemonData> {
  try {
    const response = await fetch(`${URL}/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error('Error fetching pokemon');
    }
    const data = await response.json();
    return {
      pokemons: [
        {
          pokemonName: data.name,
          description: `Height: ${data.height}, Weight: ${data.weight}`,
        },
      ],
    };
  } catch (error: unknown) {
    throw new Error('Error', { cause: error });
  }
}

export async function fetchAllPokemons(): Promise<PokemonData> {
  try {
    const response = await fetch(`${URL}?limit=10`);
    const data = await response.json();

    const results = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const res = await fetch(pokemon.url);
        const info = await res.json();
        return {
          pokemonName: info.name,
          description: `Height: ${info.height}, Weight: ${info.weight}`,
        };
      })
    );
    return { pokemons: results };
  } catch (error: unknown) {
    throw new Error('Error', { cause: error });
  }
}
