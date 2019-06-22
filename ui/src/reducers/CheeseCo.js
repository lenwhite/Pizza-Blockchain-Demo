import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const ADD_CHEESE = 'ADD_CHEESE';
export const REFRESH_CHEESES = 'REFRESH_CHEESES';
export const { addCheese, refreshCheeses } = createActions({
  [ADD_CHEESE]: ({ id, ...data }) => ({ id, data: data }),
  [REFRESH_CHEESES]: shipments => ({ shipments }),
});

const shipments = handleActions({
  [addCheese]: (state, { payload: { id, data } }) => ({ ...state, [id]: data, }),
  [REFRESH_CHEESES]: (state, { payload: { shipments } }) => ({ ...shipments }),
}, {});

const CheeseCo = combineReducers({
  shipments: shipments,
});

export default CheeseCo;
