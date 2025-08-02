import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../search/Search';
import { expect, vi } from 'vitest';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders input and button', () => {
    render(<Search onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/enter full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('load searchInput from localStorage', () => {
    localStorage.setItem('searchInput', '"pikachu"');
    render(<Search onSearch={vi.fn()} />);
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('updates input value', () => {
    render(<Search onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/enter full name/i);
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    expect(screen.getByDisplayValue('bulbasaur')).toBeInTheDocument();
  });

  it('calls onSearch when button is clicked', () => {
    const onSearchMock = vi.fn();
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/enter full name/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'charmander' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('charmander');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });
});
