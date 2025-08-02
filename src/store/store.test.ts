import { expect } from 'vitest';
import store, { toggleCard, resetSelectedCards } from './store';

describe('cardSlice reducer', () => {
  it('adds a not selected card', () => {
    store.dispatch(toggleCard('pikachu'));
    const state = store.getState();
    expect(state.selectedCards).toContain('pikachu');
  });

  it('removes a selected card', () => {
    store.dispatch(toggleCard('pikachu'));
    const state = store.getState();
    expect(state.selectedCards).not.toContain('pikachu');
  });

  it('resets selectedCards', () => {
    store.dispatch(toggleCard('bulbasaur'));
    store.dispatch(resetSelectedCards());
    const state = store.getState();
    expect(state.selectedCards).toEqual([]);
  });
});
