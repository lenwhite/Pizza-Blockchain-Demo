import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/reducers';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

function configStore() {

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
      || applyMiddleware(),
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

const store = configStore();

export default store;
