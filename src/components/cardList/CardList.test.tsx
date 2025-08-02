import { expect, vi } from 'vitest';
import * as API from '../../services/API';
import { render, screen, waitFor } from '@testing-library/react';
import CardList from './CardList';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../store/store';

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

  it('renders loading while fetching data', async () => {
    const fetchAllPokemonsMock = vi.mocked(API.fetchAllPokemons);
    fetchAllPokemonsMock.mockReturnValue(new Promise(() => {}));
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
    const fetchAllPokemonsMock = vi.mocked(API.fetchAllPokemons);
    fetchAllPokemonsMock.mockResolvedValue(mockPokemons);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
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

  it('fetches pokemon by name', async () => {
    const fetchPokemonMock = vi.mocked(API.fetchPokemonByName);
    fetchPokemonMock.mockResolvedValue([mockPokemons[0]]);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList searchName="pikachu" />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(API.fetchPokemonByName).toHaveBeenCalledWith('pikachu');
    });
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Height: 4, Weight: 60')).toBeInTheDocument();
  });

  it('updates data on prop change', async () => {
    const fetchPokemonMock = vi.mocked(API.fetchPokemonByName);

    fetchPokemonMock.mockResolvedValue(mockPokemons);
    fetchPokemonMock.mockResolvedValue([mockPokemons[1]]);

    const { rerender } = render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => expect(API.fetchAllPokemons).toHaveBeenCalled());

    rerender(
      <MemoryRouter>
        <Provider store={store}>
          <CardList searchName="bulbasaur" />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(API.fetchPokemonByName).toHaveBeenCalledWith('bulbasaur')
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Height: 7, Weight: 69')).toBeInTheDocument();
  });

  it('unselects all cards on Unselect all click', async () => {
    const fetchAllPokemonsMock = vi.mocked(API.fetchAllPokemons);
    fetchAllPokemonsMock.mockResolvedValue(mockPokemons);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(API.fetchAllPokemons).toHaveBeenCalled();
    });

    const checkbox = screen.getByRole('checkbox', { name: /pikachu/i });
    checkbox.click();

    expect(store.getState().selectedCards).toContain('pikachu');

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    unselectButton.click();

    expect(store.getState().selectedCards).toEqual([]);
  });
});
