import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

export interface RootState {
  selectedCards: string[];
}

const initialState: RootState = {
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
  reducer: cardSlice.reducer,
});

export default store;
