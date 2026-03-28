import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Details from './Details';
import { expect, vi } from 'vitest';
import { useGetPokemonByNameQuery } from '../../services/pokemonApi';

vi.mock('../../services/pokemonApi', () => ({
  useGetPokemonByNameQuery: vi.fn(),
}));

describe('Details', () => {
  const mockData = [
    {
      name: 'pikachu',
      description: 'Height: 4, Weight: 60',
      image: 'pikachu.png',
    },
  ];
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pokemon and handle close', async () => {
    vi.mocked(useGetPokemonByNameQuery).mockReturnValue({
      data: [mockData[0]],
      isFetching: false,
      error: undefined,
    } as never);

    render(<Details name="pikachu" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.queryByAltText(/loading/i)).toBeNull();
    });

    screen.getByText('pikachu');
    screen.getByText('Height: 4, Weight: 60');
    screen.getByAltText('pikachu.png');

    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });
});
