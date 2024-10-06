import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data } from '../../components/table/tableInterface';

interface FilterState {
  minDate: string | null;
  maxDate: string | null;
  name: string;
  idnp: string;
  order: 'asc' | 'desc';
  orderBy: keyof Data;
}

const loadStateFromLocalStorage = (): Partial<FilterState> => {
  const savedState = localStorage.getItem('tableState');
  return savedState ? JSON.parse(savedState) : {};
};

const saveStateToLocalStorage = (state: FilterState) => {
  localStorage.setItem('tableState', JSON.stringify(state));
};

const initialState: FilterState = {
  minDate: null,
  maxDate: null,
  name: '',
  idnp: '',
  order: 'asc',
  orderBy: 'name',
  ...loadStateFromLocalStorage(),
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      const newState = { ...state, ...action.payload };
      saveStateToLocalStorage(newState);
      return newState;
    },
    resetFilters: () => {
      localStorage.removeItem('tableState');
      return initialState;
    },
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
