import { get, remove, post } from '../api';
import { Student } from '../../redux/reducers/studentsReducer';
import { FilterState } from '../../redux/reducers/tableFilterReducer';

export const SERVICE_URI = '/backend';
export const BASE_URI = '/v1/students';

const serializeFilterState = (filter: FilterState): string => {
  const params = new URLSearchParams();

  if (filter.minDate) params.append('minDate', filter.minDate);
  if (filter.maxDate) params.append('maxDate', filter.maxDate);
  if (filter.name) params.append('name', filter.name);
  if (filter.idnp) params.append('idnp', filter.idnp);
  params.append('order', filter.order);
  params.append('orderBy', filter.orderBy);

  return params.toString();
};

export const getAllStudents = (filter: FilterState) => {
  const queryString = serializeFilterState(filter);
  return get(`${SERVICE_URI}${BASE_URI}/all?${queryString}`);
};

export const getStudent = (idnp: number) =>
  get(`${SERVICE_URI}${BASE_URI}/${idnp}`);

export const updateStudent = (student: Student) =>
  post(`${SERVICE_URI}${BASE_URI}/update`, student);

export const createStudent = (student: Student) =>
  post(`${SERVICE_URI}${BASE_URI}`, student);

export const deleteStudent = (idnp: number) =>
  remove(`${SERVICE_URI}${BASE_URI}/${idnp}`);
