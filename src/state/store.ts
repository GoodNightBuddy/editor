import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { bundlerMiddleware } from './middlewares/bundler-middleware';
import { persistMiddleware } from './middlewares/persist-middleware';
import reducers from './reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(bundlerMiddleware, persistMiddleware, thunk)
  );
