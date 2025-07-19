import { expect, vi } from 'vitest';
import * as API from '../../services/API';
import { render, screen, waitFor } from '@testing-library/react';
import CardList from './CardList';

vi.mock('../../services/API');

describe('CardList component', () => {
  const mockPokemons = [
    { pokemonName: 'pikachu', description: 'Height: 4, Weight: 60' },
    { pokemonName: 'bulbasaur', description: 'Height: 7, Weight: 69' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render loading while fetching data', async () => {
    const fetchAllPokemonsMock = vi.mocked(API.fetchAllPokemons);
    fetchAllPokemonsMock.mockReturnValue(new Promise(() => {}));
    render(<CardList name="" />);
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });

  it('fetch all pokemons', async () => {
    const fetchAllPokemonsMock = vi.mocked(API.fetchAllPokemons);
    fetchAllPokemonsMock.mockResolvedValue({ pokemons: mockPokemons });
    render(<CardList name="" />);
    await waitFor(() => {
      expect(API.fetchAllPokemons).toHaveBeenCalled();
    });
    for (const pokemon of mockPokemons) {
      expect(screen.getByText(pokemon.pokemonName)).toBeInTheDocument();
      expect(screen.getByText(pokemon.description)).toBeInTheDocument();
    }
  });

  it('fetch pokemon by name', async () => {
    const fetchPokemonMock = vi.mocked(API.fetchPokemonByName);
    fetchPokemonMock.mockResolvedValue({ pokemons: [mockPokemons[0]] });
    render(<CardList name="pikachu" />);
    await waitFor(() => {
      expect(API.fetchPokemonByName).toHaveBeenCalledWith('pikachu');
    });
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Height: 4, Weight: 60')).toBeInTheDocument();
  });

  it('update data on prop change', async () => {
    const fetchPokemonMock = vi.mocked(API.fetchPokemonByName);

    fetchPokemonMock.mockResolvedValue({ pokemons: mockPokemons });
    fetchPokemonMock.mockResolvedValue({ pokemons: [mockPokemons[1]] });

    const { rerender } = render(<CardList name="" />);
    await waitFor(() => expect(API.fetchAllPokemons).toHaveBeenCalled());

    rerender(<CardList name="bulbasaur" />);
    await waitFor(() =>
      expect(API.fetchPokemonByName).toHaveBeenCalledWith('bulbasaur')
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Height: 7, Weight: 69')).toBeInTheDocument();
  });
});
