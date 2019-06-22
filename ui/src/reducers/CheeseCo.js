import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const ADD_CHEESE = 'ADD_CHEESE';
export const REFRESH_CHEESES = 'REFRESH_CHEESES';
export const DELETE_CHEESE = 'DELETE_CHEESE';

export const { addCheese, refreshCheeses, deleteCheese } = createActions({
  [ADD_CHEESE]: ({ id, ...data }) => ({ id, data: data }),
  [REFRESH_CHEESES]: shipments => ({ shipments }),
  [DELETE_CHEESE]: id => ({ id }),
});

const shipments = handleActions({
  [addCheese]: (state, { payload: { id, data } }) => ({ ...state, [id]: data, }),
  [refreshCheeses]: (state, { payload: { shipments } }) => ({ ...shipments }),
  [deleteCheese]: (state, { payload: { id } }) => {
    let next = { ...state };
    delete next[id];
    return next;
  },
}, {});

const CheeseCo = combineReducers({
  shipments: shipments,
});

export default CheeseCo;
