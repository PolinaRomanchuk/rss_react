import { render, screen } from '@testing-library/react';
import Search from '../search/Search';
import { expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

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

  it('updates input value', async () => {
    render(<Search onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/enter full name/i);
    const user = userEvent.setup();
    await user.type(input, 'bulbasaur');
    expect(screen.getByDisplayValue('bulbasaur')).toBeInTheDocument();
  });

  it('calls onSearch when button is clicked', async () => {
    const onSearchMock = vi.fn();
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(/enter full name/i);
    const button = screen.getByRole('button', { name: /search/i });

    const user = userEvent.setup();

    await user.type(input, 'charmander');
    await user.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('charmander');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });
});
