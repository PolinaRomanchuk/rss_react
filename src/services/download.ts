import store from '../store/store';
import type { Pokemon } from '../type/pokemon';
import { pokemonApi } from './pokemonApi';

async function loadSelectedPokemons(
  selectedNames: string[]
): Promise<Pokemon[]> {
  const state = store.getState();
  const results = await Promise.all(
    selectedNames.map(async (name) => {
      const cached = pokemonApi.endpoints.getPokemonByName.select(name)(state);
      if (cached?.data) {
        return cached.data[0];
      }

      const result = await store
        .dispatch(pokemonApi.endpoints.getPokemonByName.initiate(name))
        .unwrap();

      return result[0];
    })
  );

  return results.filter((p): p is Pokemon => Boolean(p));
}

export async function getDownloadUrl(
  selectedNames: string[]
): Promise<{ href: string; filename: string }> {
  const selectedPokemons = await loadSelectedPokemons(selectedNames);

  const csv = JSON.stringify(selectedPokemons, null, 2);
  const dataUri = 'data:text/json;charset=utf8,' + encodeURIComponent(csv);
  const filename = `${selectedNames.length}_items.csv`;
  return { href: dataUri, filename };
}
