import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  idnp: number;
  name: string;
  birth: string;
  status: 'enrolled' | 'expelled';
}

const initialRows: Student[] = [
  {
    name: 'Mikel Frederich',
    birth: '01.09.1973',
    status: 'enrolled',
    idnp: 2005002334569,
  },
  {
    name: 'Mikesl Frederichs',
    birth: '01.09.2024',
    status: 'enrolled',
    idnp: 2115002334569,
  },
  {
    name: 'Arnold Cornelius',
    birth: '02.12.2001',
    status: 'expelled',
    idnp: 2005002334568,
  },
  {
    name: 'Valentino Gosling',
    birth: '22.04.1999',
    status: 'expelled',
    idnp: 2005002334567,
  },
  {
    name: 'Jacqueline Clark',
    birth: '25.07.1968',
    status: 'expelled',
    idnp: 2005002334868,
  },
  {
    name: 'Justin Bonilla',
    birth: '23.05.1964',
    status: 'expelled',
    idnp: 2005002334734,
  },
  {
    name: 'Pamela Patterson',
    birth: '23.08.1994',
    status: 'expelled',
    idnp: 2005002334874,
  },
  {
    name: 'Alexander Pierce',
    birth: '22.05.1950',
    status: 'expelled',
    idnp: 2005002334385,
  },
  {
    name: 'James Barber',
    birth: '11.08.1965',
    status: 'expelled',
    idnp: 2005002334032,
  },
];

const loadStudentsFromLocalStorage = (): Student[] => {
  try {
    const savedStudents = localStorage.getItem('students');
    if (!savedStudents) {
      return initialRows;
    }
    const parsedStudents = JSON.parse(savedStudents);
    if (Array.isArray(parsedStudents)) {
      return parsedStudents;
    }
  } catch (error) {
    console.error('Failed to load students from local storage:', error);
  }
  return initialRows;
};

const initialState: { students: Student[] } = {
  students: loadStudentsFromLocalStorage(),
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents(state, action: PayloadAction<Student[]>) {
      state.students = action.payload;
      localStorage.setItem('students', JSON.stringify(action.payload));
    },
    updateStudentStatus(
      state,
      action: PayloadAction<{ idnp: number; status: 'enrolled' | 'expelled' }>,
    ) {
      const { idnp, status } = action.payload;
      const student = state.students.find((s) => s.idnp === idnp);
      if (student) {
        student.status = status;
        localStorage.setItem('students', JSON.stringify(state.students));
      }
    },
  },
});

export const { setStudents, updateStudentStatus } = studentsSlice.actions;
export default studentsSlice.reducer;
