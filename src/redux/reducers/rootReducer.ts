import { combineReducers } from 'redux';
import TableFilterReducer from './tableFilterReducer';
import StudentsReducer from './studentsReducer';

const rootReducer = combineReducers({
  filterSlice: TableFilterReducer,
  studentSlice: StudentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
