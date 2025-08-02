import { createStore } from 'redux';

const TOGGLE_CARD = 'TOGGLE_CARD';
const RESET_CARD = 'RESET_CARD';

const initialState = {
  selectedCards: [],
};

export interface RootState {
  selectedCards: string[];
}

type Action =
  | { type: typeof TOGGLE_CARD; payload: string }
  | { type: typeof RESET_CARD };

const reducer = (state: RootState = initialState, action: Action) => {
  switch (action.type) {
    case TOGGLE_CARD: {
      const alreadySelected = state.selectedCards.includes(action.payload);

      return {
        ...state,
        selectedCards: alreadySelected
          ? state.selectedCards.filter((name) => name !== action.payload)
          : [...state.selectedCards, action.payload],
      };
    }
    case RESET_CARD:
      return { ...state, selectedCards: [] };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
