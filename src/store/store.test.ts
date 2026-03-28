import { expect } from 'vitest';
import store, { toggleCard, resetSelectedCards, type RootState } from './store';

describe('cardSlice reducer', () => {
  beforeEach(() => {
    store.dispatch(resetSelectedCards());
  });

  it('adds a not selected card', () => {
    store.dispatch(toggleCard('pikachu'));
    const state: RootState = store.getState();
    expect(state.cards.selectedCards).toContain('pikachu');
  });

  it('removes a selected card', () => {
    store.dispatch(toggleCard('pikachu'));
    store.dispatch(toggleCard('pikachu'));
    const state = store.getState();
    expect(state.cards.selectedCards).not.toContain('pikachu');
  });

  it('resets selectedCards', () => {
    store.dispatch(toggleCard('bulbasaur'));
    store.dispatch(resetSelectedCards());
    const state = store.getState();
    expect(state.cards.selectedCards).toEqual([]);
  });
});
