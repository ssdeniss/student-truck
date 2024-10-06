import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableSearch from './TableSearch';
import TableHead from '@mui/material/TableHead';
import { Column, Data, TableHeaderProps } from './tableInterface';
import TableDateFilter from './TableDateFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  orderBy,
  order,
  handleRequestSort,
  handleSearchQuery,
  handleDateFilter,
}) => {
  const searchValues = {
    name: useSelector((state: RootState) => state.filterSlice.name),
    idnp: useSelector((state: RootState) => state.filterSlice.idnp),
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column: Column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.sort ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={() => handleRequestSort(column.id as keyof Data)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
            {column.id === 'name' && (
              <TableSearch
                setSearchQuery={handleSearchQuery}
                searchType="name"
                value={searchValues.name}
              />
            )}
            {column.id === 'idnp' && (
              <TableSearch
                setSearchQuery={handleSearchQuery}
                searchType="idnp"
                value={searchValues.idnp}
              />
            )}
            {column.id === 'birth' && (
              <TableDateFilter onFilter={handleDateFilter} />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
