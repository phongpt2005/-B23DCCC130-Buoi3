// src/redux/store.ts

import { legacy_createStore as createStore, combineReducers } from 'redux';

// Define the initial state and the reducer for goods
interface GoodsItem {
  id: number;
  name: string;
  price: number;
}

interface GoodsState {
  items: GoodsItem[];
}

const initialState: GoodsState = {
  items: [],
};

const goodsReducer = (state = initialState, action: any): GoodsState => {
  switch (action.type) {
    case 'ADD_GOODS':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'EDIT_GOODS':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_GOODS':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  goods: goodsReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
