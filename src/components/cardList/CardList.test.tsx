import { expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import CardList from './CardList';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../store/store';
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../../services/pokemonApi';

vi.mock('../../services/pokemonApi', async (importOriginal) => {
  const actualModule = await importOriginal();
  const actual = actualModule as typeof import('../../services/pokemonApi');
  return {
    ...actual,
    useGetAllPokemonsQuery: vi.fn(() => ({
      data: undefined,
      isFetching: false,
      error: undefined,
    })),
    useGetPokemonByNameQuery: vi.fn(() => ({
      data: undefined,
      isFetching: false,
      error: undefined,
    })),
  };
});

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

  it('renders loading while fetching data', async () => {
    (
      useGetAllPokemonsQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: undefined,
      isFetching: true,
      error: undefined,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
  });

  it('fetches all pokemons', async () => {
    (
      useGetAllPokemonsQuery as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      data: mockPokemons,
      isFetching: false,
      error: undefined,
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      mockPokemons.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      });
    });
  });

  it('fetches pokemon by name', async () => {
    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: [mockPokemons[0]],
      isFetching: false,
      error: undefined,
    } as never);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList searchName="pikachu" />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('updates data on prop change', async () => {
    vi.mocked(useGetAllPokemonsQuery).mockReturnValue({
      data: mockPokemons,
      isFetching: false,
      error: undefined,
    } as never);

    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: [mockPokemons[1]],
      isFetching: false,
      error: undefined,
    } as never);

    const { rerender } = render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    rerender(
      <MemoryRouter>
        <Provider store={store}>
          <CardList searchName="bulbasaur" />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText('pikachu')).not.toBeInTheDocument();
    });
  });

  it('unselects all cards on Unselect all click', async () => {
    vi.mocked(useGetAllPokemonsQuery).mockReturnValue({
      data: mockPokemons,
      isFetching: false,
      error: undefined,
    } as never);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </MemoryRouter>
    );

    const checkbox = screen.getByRole('checkbox', { name: /pikachu/i });
    checkbox.click();

    expect(store.getState().cards.selectedCards).toContain('pikachu');

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    unselectButton.click();

    expect(store.getState().cards.selectedCards).toEqual([]);
  });
});
