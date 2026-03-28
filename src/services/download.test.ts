import { describe, it, expect, vi } from 'vitest';
import { getDownloadUrl } from './download';

vi.mock('../store/store', () => ({
  __esModule: true,
  default: {
    getState: vi.fn(),
    dispatch: vi.fn(),
  },
}));

vi.mock('../../services/pokemonApi', () => ({
  pokemonApi: {
    endpoints: {
      getPokemonByName: {
        select: vi.fn(),
        initiate: vi.fn(),
      },
    },
  },
}));

describe('getDownloadUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles empty selection', async () => {
    const result = await getDownloadUrl([]);
    expect(result.filename).toBe('0_items.json');
    expect(result.href).toContain(encodeURIComponent('[]'));
  });
});
