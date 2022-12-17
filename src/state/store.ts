import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ActionType } from './action-types';
import { bundlerMiddleware } from './middlewares/bundler-middleware';
import reducers from './reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(bundlerMiddleware, thunk)
  );

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: '',
    type: 'code'
  }
})

store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: '',
    type: 'text'
  }
})
