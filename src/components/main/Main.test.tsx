import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../main/Main';
import { expect, vi } from 'vitest';

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
  default: ({ name }: { name: string }) => (
    <div data-testid="card-list">Card list for {name}</div>
  ),
}));

describe('Main component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('render Search, CardList and error button', () => {
    render(<Main />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toHaveTextContent('Card list for');
    expect(screen.getByRole('button', { name: /error/i })).toBeInTheDocument();
  });

  it('update searchInput', () => {
    render(<Main />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Pikachu' } });
    expect(screen.getByTestId('card-list')).toHaveTextContent(
      'Card list for Pikachu'
    );
    expect(localStorage.getItem('searchInput')).toBe('Pikachu');
  });
});
