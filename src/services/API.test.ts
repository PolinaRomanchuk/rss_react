import { fetchAllPokemons, fetchPokemonByName } from './API';
import { expect, vi } from 'vitest';

describe('API functions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchPokemonByName', () => {
    it('return pokemon for name', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => ({
            name: 'pikachu',
            height: 4,
            weight: 60,
          }),
        })
      );

      const result = await fetchPokemonByName('Pikachu');

      expect(result).toEqual({
        pokemons: [
          {
            pokemonName: 'pikachu',
            description: 'Height: 4, Weight: 60',
          },
        ],
      });
    });

    it('throw error', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
        })
      );

      await expect(fetchPokemonByName('unknown')).rejects.toThrow('Error');
    });
  });

  describe('fetchAllPokemons', () => {
    it('return list of pokemons', async () => {
      const mockList = {
        results: [
          { name: 'bulbasaur', url: 'url1' },
          { name: 'pikachu', url: 'url2' },
        ],
      };

      const mockDetails = [
        { name: 'bulbasaur', height: 7, weight: 69 },
        { name: 'pikachu', height: 4, weight: 60 },
      ];

      const fetchMock = vi
        .fn()
        .mockResolvedValueOnce({ json: async () => mockList })
        .mockResolvedValueOnce({ json: async () => mockDetails[0] })
        .mockResolvedValueOnce({ json: async () => mockDetails[1] });

      vi.stubGlobal('fetch', fetchMock);

      const result = await fetchAllPokemons();

      expect(result).toEqual({
        pokemons: [
          {
            pokemonName: 'bulbasaur',
            description: 'Height: 7, Weight: 69',
          },
          {
            pokemonName: 'pikachu',
            description: 'Height: 4, Weight: 60',
          },
        ],
      });

      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it('throw error', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Fetch failed'))
      );

      await expect(fetchAllPokemons()).rejects.toThrow('Error');
    });
  });
});
