import { createStore } from '@reduxjs/toolkit'
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools());