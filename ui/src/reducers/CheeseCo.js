import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const ADD_CHEESE = 'ADD_CHEESE';
export const { addCheese } = createActions({
  [ADD_CHEESE]: shipment => ({ shipment }),
});

const shipments = handleActions({
  [addCheese]: (state, { payload: { shipment } }) => ([...state, shipment,]),
}, []);

const CheeseCo = combineReducers({
  shipments: shipments,
});

export default CheeseCo;
