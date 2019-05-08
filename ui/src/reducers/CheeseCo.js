import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

export const { addShipment } = createActions({
  ADD_SHIPMENT: shipment => ({ shipment }),
});

const shipments = handleActions({
  [addShipment]: (state, { payload: { shipment } }) => ([
    ...state,
    shipment,
  ]),
}, []);

const CheeseCo = combineReducers({
  shipments: shipments,
});

export default CheeseCo;