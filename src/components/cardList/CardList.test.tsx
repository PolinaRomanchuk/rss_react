import { expect, vi } from 'vitest';
import * as API from '../../services/API';
import { render, screen, waitFor } from '@testing-library/react';
import CardList from './CardList';
import { MemoryRouter } from 'react-router';

vi.mock('../../services/API');

describe('CardList component', () => {
  const mockPokemons = [
    { name: 'pikachu', description: 'Height: 4, Weight: 60', image: '' },
    {
      name: 'bulbasaur',
      description: 'Height: 7, Weight: 69',
      image: '',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render loading while fetching data', async () => {
    const fetchAllPokemonsMock = vi.mocked(API.fetchAllPokemons);
    fetchAllPokemonsMock.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });

  it('fetch all pokemons', async () => {
    const fetchAllPokemonsMock = vi.mocked(API.fetchAllPokemons);
    fetchAllPokemonsMock.mockResolvedValue(mockPokemons);
    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(API.fetchAllPokemons).toHaveBeenCalled();
    });
    for (const pokemon of mockPokemons) {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByText(pokemon.description)).toBeInTheDocument();
    }
  });

  it('fetch pokemon by name', async () => {
    const fetchPokemonMock = vi.mocked(API.fetchPokemonByName);
    fetchPokemonMock.mockResolvedValue([mockPokemons[0]]);

    render(
      <MemoryRouter>
        <CardList searchName="pikachu" />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(API.fetchPokemonByName).toHaveBeenCalledWith('pikachu');
    });
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Height: 4, Weight: 60')).toBeInTheDocument();
  });

  it('update data on prop change', async () => {
    const fetchPokemonMock = vi.mocked(API.fetchPokemonByName);

    fetchPokemonMock.mockResolvedValue(mockPokemons);
    fetchPokemonMock.mockResolvedValue([mockPokemons[1]]);

    const { rerender } = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    await waitFor(() => expect(API.fetchAllPokemons).toHaveBeenCalled());

    rerender(
      <MemoryRouter>
        <CardList searchName="bulbasaur" />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(API.fetchPokemonByName).toHaveBeenCalledWith('bulbasaur')
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Height: 7, Weight: 69')).toBeInTheDocument();
  });
});
