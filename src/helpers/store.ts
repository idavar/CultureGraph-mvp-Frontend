import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['login']
};
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const middlewares = [thunk];

export const store = createStore(persistedReducer, composeEnhancers(
	applyMiddleware(...middlewares)
));
export const persistor = persistStore(store);
