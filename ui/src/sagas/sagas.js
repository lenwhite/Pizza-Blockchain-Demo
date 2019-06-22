import {
  fetchSucceeded,
  fetchFailed,
  postJson,
  FETCH_DATA,
  FETCH_SUCCEEDED,
  FETCH_FAILED,
} from '../reducers/fetch';
import CONFIG from '../CONFIG'

import { put, call, all, takeEvery } from 'redux-saga/effects';
import { ADD_CHEESE } from '../reducers/CheeseCo';

function* watchAddCheese() { yield takeEvery(ADD_CHEESE, addCheese); };

function* addCheese(action) {
  let url = new URL(CONFIG.API.MINT_TOKEN(action.payload.shipment.id), window.location.href);
  url.port = CONFIG.API.port;

  yield put(postJson(
    url,
    JSON.stringify(action.payload.shipment),
    'cheese',
    { method: 'PUT' }
  ));
}

function* watchFetchData() { yield takeEvery(FETCH_DATA, fetchData); }

function* fetchData(action) {
  console.log(`${action.type}:`);
  console.log(action.payload);

  try {
    const response = yield call(fetch, action.payload.url, action.payload.fetchOptions);

    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();
      yield put(fetchSucceeded(action.payload.url, data));
    } else {
      yield put(fetchFailed(action.payload.url, response));
    }
  } catch (error) {
    yield put(fetchFailed(action.payload.url, error));
  }
}

function* watchFetchSuccess() { yield takeEvery(FETCH_SUCCEEDED, logFetchResult); }
function* watchFetchFailed() { yield takeEvery(FETCH_FAILED, logFetchResult); }

function logFetchResult(action) {
  console.log(`${action.type}:`);
  console.log(action.payload);
}

export default function* rootSaga() {
  yield all([
    watchAddCheese(),
    watchFetchData(),
    watchFetchSuccess(),
    watchFetchFailed(),
  ]);
}
