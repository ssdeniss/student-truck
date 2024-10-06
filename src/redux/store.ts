import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { setStudents } from './reducers/studentsReducer';

const loadStudentsFromLocalStorage = () => {
  const savedStudents = localStorage.getItem('students');
  const parsedStudents = savedStudents ? JSON.parse(savedStudents) : [];
  return parsedStudents;
};

const store = configureStore({
  reducer: rootReducer,
});

const initialStudents = loadStudentsFromLocalStorage();
if (initialStudents.length > 0) {
  store.dispatch(setStudents(initialStudents));
} else {
  console.log('No students found in local storage, using initial rows.');
}

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('students', JSON.stringify(state.studentSlice.students));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
