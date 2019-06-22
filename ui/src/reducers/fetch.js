import { createActions } from 'redux-actions';

export const FetchStatus = {
  READY: 'READY',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
}

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_READY = 'FETCH_READY';
export const FETCH_FAILED = 'FETCH_FAILED';
export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED';
export const FETCH_RESET = 'FETCH_RESET';

export const {
  fetchData,
  fetchReady,
  fetchReset,
  fetchFailed,
  fetchSucceeded,
} = createActions({
  [FETCH_DATA]: (url, fetchOptions, auth) => {
    if (auth) {
      if (!fetchOptions.headers) fetchOptions.headers = {};

      fetchOptions.headers['Authorization'] = 'Basic ' + Buffer.from(auth + ":").toString('base64');
    }

    return { url, fetchOptions };
  },
  [FETCH_READY]: undefined,
  [FETCH_RESET]: undefined,
  [FETCH_FAILED]: (url, error) => ({ url, error }),
  [FETCH_SUCCEEDED]: (url, data) => ({ url, data }),
});

export const postJson = (url, body, auth, fetchOptions = {}) => fetchData(
  url,
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: body,
    ...fetchOptions
  },
  auth,
);
