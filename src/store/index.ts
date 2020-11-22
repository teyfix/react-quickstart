import { combineReducers, createStore } from 'redux';
import counter from './counter';

const store = createStore(
  combineReducers({
    counter,
  }),
);

export default store;
