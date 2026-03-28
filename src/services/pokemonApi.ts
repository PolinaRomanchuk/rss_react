import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon } from '../type/pokemon';

interface PokemonApiResponse {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  order: number;
  abilities?: [{ ability: { name: string } }];
  stats?: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    },
  ];
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getAllPokemons: builder.query<Pokemon[], number>({
      query: (page = 1) => `pokemon?limit=8&offset=${(page - 1) * 8}`,
      transformResponse: async (response: {
        results: { name: string; url: string }[];
      }) => {
        const results = await Promise.all(
          response.results.map(
            async (pokemon: { name: string; url: string }) => {
              const res = await fetch(pokemon.url);
              const info = await res.json();
              return {
                name: info.name,
                description: `Height: ${info.height}, Weight: ${info.weight}`,
                image: info.sprites.front_default,
                order: info.order,
              };
            }
          )
        );
        return results;
      },
      providesTags: ['Pokemon'],
    }),

    getPokemonByName: builder.query<Pokemon[], string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
      transformResponse: (data: PokemonApiResponse) => [
        {
          name: data.name,
          description: `Height: ${data.height}, Weight: ${data.weight}`,
          image: data.sprites.front_default,
          order: data.order,
          abilities: data.abilities,
          stats: data.stats,
        },
      ],
      providesTags: (_result, _error, name) => [{ type: 'Pokemon', id: name }],
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetPokemonByNameQuery } = pokemonApi;
