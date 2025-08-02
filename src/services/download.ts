import { fetchPokemonByName } from './API';
import type { Pokemon } from '../type/pokemon';

async function loadSelectedPokemons(
  selectedNames: string[]
): Promise<Pokemon[]> {
  try {
    const results = await Promise.all(
      selectedNames.map(async (name) => {
        const pokemons = await fetchPokemonByName(name);
        return pokemons[0];
      })
    );

    return results;
  } catch (error) {
    console.error('Error loading selected pokemons:', error);
    return [];
  }
}

export async function getDownloadUrl(
  selectedNames: string[]
): Promise<{ href: string; filename: string }> {
  const selectedPokemons = await loadSelectedPokemons(selectedNames);

  const json = JSON.stringify(selectedPokemons, null, 2);
  const dataUri = 'data:text/json;charset=utf8,' + encodeURIComponent(json);
  const filename = `${selectedNames.length}_items.json`;
  return { href: dataUri, filename };
}
