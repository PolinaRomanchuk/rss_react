import type { Pokemon } from '../type/pokemon';

const URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonByName(name: string): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${URL}/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error('Error fetching pokemon');
    }
    const data = await response.json();
    return [
      {
        name: data.name,
        description: `Height: ${data.height}, Weight: ${data.weight}`,
        image: data.sprites.front_default,
      },
    ];
  } catch (error: unknown) {
    throw new Error('Error', { cause: error });
  }
}

export async function fetchAllPokemons(): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${URL}?limit=30`);
    const data = await response.json();

    const results = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const res = await fetch(pokemon.url);
        const info = await res.json();
        return {
          name: info.name,
          description: `Height: ${info.height}, Weight: ${info.weight}`,
          image: info.sprites.front_default,
        };
      })
    );
    return results;
  } catch (error: unknown) {
    throw new Error('Error', { cause: error });
  }
}
