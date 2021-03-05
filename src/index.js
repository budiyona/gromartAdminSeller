import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { persistReducer } from 'redux-persist';
import auth from './reducers';
import { combineReducers, createStore } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key : 'root',
  storage,
  whitelist: ['auth']
}
const reducers = combineReducers({
  auth
})
const persistReducersInit = persistReducer(persistConfig, reducers)
const store = createStore(persistReducersInit, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const persistor = persistStore(store)



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
