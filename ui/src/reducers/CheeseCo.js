import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const ADD_CHEESE = 'ADD_CHEESE';
export const GET_CHEESES = 'GET_CHEESES';
export const { addCheese, getCheeses } = createActions({
  [ADD_CHEESE]: ({ id, ...data }) => ({ id, data: data }),
  [GET_CHEESES]: shipments => ({ shipments }),
});

const shipments = handleActions({
  [addCheese]: (state, { payload: { id, data } }) => ({ ...state, [id]: data, }),
  [getCheeses]: (state, { payload: { shipments } }) => ({ ...shipments })
}, {});

const CheeseCo = combineReducers({
  shipments: shipments,
});

export default CheeseCo;
