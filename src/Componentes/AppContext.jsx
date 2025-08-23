import React, { useContext } from 'react';

// Context Setup
const AppContext = React.createContext();

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_PRODUCT':
      return { 
        ...state, 
        products: [...state.products, { 
          id: Date.now(), 
          name: action.payload.name, 
          price: action.payload.price,
          inStock: true 
        }] 
      };
    case 'TOGGLE_STOCK':
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload 
            ? { ...product, inStock: !product.inStock }
            : product
        )
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'UPDATE_SCORE':
      return { ...state, gameScore: state.gameScore + action.payload };
    case 'RESET_SCORE':
      return { ...state, gameScore: 0 };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'CLEAR_PRODUCTS':
      return { ...state, products: [] };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  user: { name: 'Desarrollador React', email: 'dev@react.dev' },
  products: [],
  currentPage: 'inicio',
  gameScore: 0,
  theme: 'light'
};

// Custom Hook
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
};

export { AppContext, appReducer, initialState, useAppContext };