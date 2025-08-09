import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { pokemonApi } from '../services/pokemonApi';

export interface CardsState {
  selectedCards: string[];
}

export interface RootState {
  cards: CardsState;
}

const initialState: CardsState = {
  selectedCards: [],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    toggleCard: (state, action: PayloadAction<string>) => {
      const alreadySelected = state.selectedCards.includes(action.payload);

      if (alreadySelected) {
        state.selectedCards = state.selectedCards.filter(
          (name) => name !== action.payload
        );
      } else {
        state.selectedCards.push(action.payload);
      }
    },
    resetSelectedCards: (state) => {
      state.selectedCards = [];
    },
  },
});

export const { toggleCard, resetSelectedCards } = cardSlice.actions;
const store = configureStore({
  reducer: {
    cards: cardSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;
