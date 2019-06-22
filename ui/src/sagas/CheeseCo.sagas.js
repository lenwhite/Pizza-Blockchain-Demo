import { ADD_CHEESE, REFRESH_CHEESES, refreshCheeses } from '../reducers/CheeseCo';

import { put, call, takeEvery } from 'redux-saga/effects';
import { mintToken, listTokens } from './api.sagas';

export function* watchAddCheese() { yield takeEvery(ADD_CHEESE, addCheese); };

function* addCheese(action) {
  try {
    yield call(mintToken, action.payload.id, action.payload.data, 'cheese');
  }
  catch (error) {

  }
};

export function* watchRefreshCheeses() { yield takeEvery(REFRESH_CHEESES, getCheeses); };

function* getCheeses({ payload: { shipments } }) {
  if (shipments) return;

  try {
    let response = yield call(listTokens, 'cheese');

    yield put(refreshCheeses(response.data));
  } catch (error) {

  }
};
