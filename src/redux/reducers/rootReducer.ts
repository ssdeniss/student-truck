import { combineReducers } from 'redux';
import TableFilterReducer from './tableFilterReducer';

const rootReducer = combineReducers({
  filterSlice: TableFilterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
