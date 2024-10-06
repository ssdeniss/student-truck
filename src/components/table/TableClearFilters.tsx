import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../redux/reducers/tableFilterReducer';

interface TableClearFiltersProps {
  students: any[]; // Adjust the type as needed
  setFilteredRows: React.Dispatch<React.SetStateAction<any[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  pagination: number[];
}

const TableClearFilters: React.FC<TableClearFiltersProps> = ({
  students,
  setFilteredRows,
  setPage,
  setRowsPerPage,
  pagination,
}) => {
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    dispatch(resetFilters());
    setFilteredRows(students);
    setPage(0);
    setRowsPerPage(pagination[0]);
  };

  return (
    <Button variant="contained" onClick={handleClearFilters}>
      Clear all filters
    </Button>
  );
};

export default TableClearFilters;
