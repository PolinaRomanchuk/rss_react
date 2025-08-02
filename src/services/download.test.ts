import { describe, it, expect, vi } from 'vitest';
import { getDownloadUrl } from './download';
import * as API from './API';

describe('getDownloadUrl', () => {
  it('returns correct href and filename', async () => {
    const mockPokemon = {
      name: 'pikachu',
      description: 'Height: 4, Weight: 60',
      image: 'url',
    };

    vi.spyOn(API, 'fetchPokemonByName').mockResolvedValue([mockPokemon]);

    const selectedNames = ['pikachu'];
    const result = await getDownloadUrl(selectedNames);

    expect(result.filename).toBe('1_items.json');
    expect(result.href).toContain(
      encodeURIComponent(JSON.stringify([mockPokemon], null, 2))
    );
  });

  it('handles empty selection', async () => {
    const result = await getDownloadUrl([]);
    expect(result.filename).toBe('0_items.json');
    expect(result.href).toContain(encodeURIComponent('[]'));
  });
});
