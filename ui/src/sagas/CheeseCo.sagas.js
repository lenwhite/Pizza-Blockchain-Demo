import {
  ADD_CHEESE, REFRESH_CHEESES, refreshCheeses, DELETE_CHEESE, SEND_CHEESE
} from '../reducers/CheeseCo';

import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { mintToken, listTokens, burnToken, sendToken } from './api.sagas';

export function* watchAddCheese() { yield takeEvery(ADD_CHEESE, addCheese); };

function* addCheese(action) {
  try {
    yield call(mintToken, action.payload.id, action.payload.data, 'cheese');
  }
  catch (error) {

  }
};

export function* watchRefreshCheeses() { yield takeLatest(REFRESH_CHEESES, getCheeses); };

function* getCheeses({ payload: { shipments } }) {
  if (shipments) return;

  try {
    let response = yield call(listTokens, 'cheese');

    yield put(refreshCheeses(response.data));
  } catch (error) {

  }
};

export function* watchDeleteCheese() { yield takeEvery(DELETE_CHEESE, deleteCheese) };

function* deleteCheese({ payload: { id } }) {
  try {
    yield call(burnToken, id, 'cheese');
  } catch (error) {

  }
};

export function* watchSendCheese() { yield takeEvery(SEND_CHEESE, sendCheese) }

function* sendCheese({ payload: { id, toAddress } }) {
  try {
    yield call(sendToken, id, toAddress, 'cheese');
  } catch (error) {

  }
};
