import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableSearch from './TableSearch';
import TableHead from '@mui/material/TableHead';
import { Column, Data, TableHeaderProps } from './tableInterface';
import TableDateFilter from './TableDateFilter';

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  orderBy,
  order,
  handleRequestSort,
  handleSearchQuery,
  handleDateFilter,
}) => {
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
              />
            )}
            {column.id === 'idnp' && (
              <TableSearch
                setSearchQuery={handleSearchQuery}
                searchType="idnp"
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
