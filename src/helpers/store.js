import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['login']
}
const persistedReducer = persistReducer(persistConfig, reducers)
const composeEnhancers = (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const middlewares = [thunk]

export const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(...middlewares)
))
export const persistor = persistStore(store)
