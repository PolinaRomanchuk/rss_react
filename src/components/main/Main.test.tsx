import { render, screen } from '@testing-library/react';
import Main from '../main/Main';
import { expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../store/store';

vi.mock('../search/Search', () => ({
  default: ({ onSearch }: { onSearch: (value: string) => void }) => (
    <input
      placeholder="Search"
      onChange={(e) => onSearch(e.target.value)}
      data-testid="search-input"
    />
  ),
}));

vi.mock('../cardList/CardList', () => ({
  default: ({ searchName }: { searchName: string }) => (
    <div data-testid="card-list">Card list for {searchName}</div>
  ),
}));

describe('Main component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Search, CardList and error button', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toHaveTextContent('Card list for');
    expect(screen.getByRole('button', { name: /error/i })).toBeInTheDocument();
  });

  it('updates searchInput', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    const user = userEvent.setup();
    await user.type(input, 'Pikachu');
    expect(screen.getByTestId('card-list')).toHaveTextContent(
      'Card list for Pikachu'
    );
    expect(JSON.parse(localStorage.getItem('searchInput') ?? '')).toBe(
      'Pikachu'
    );
  });
});
