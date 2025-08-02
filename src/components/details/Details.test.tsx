import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Details from './Details';
import * as API from '../../services/API';
import { expect, vi } from 'vitest';

vi.mock('../../services/API');

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
    const fetchPokemonByNameMock = vi.mocked(API.fetchPokemonByName);
    fetchPokemonByNameMock.mockResolvedValue(mockData);

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
