import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// init store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

// Every time the state changes, log it
store.subscribe(() => {
  console.log(store.getState());
});

// Log the initial state
// console.log(store.getState());

export default store;
