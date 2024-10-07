import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { Data, TableContentProps } from './tableInterface';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import TableEmpty from './TableEmpty';
import { useDispatch } from 'react-redux';
import { deleteStudent, Student } from '../../redux/reducers/studentsReducer';
import TableModal from './TableModal';

const TableContent: React.FC<TableContentProps> = ({
  sortedRows,
  page,
  rowsPerPage,
  columns,
  handleToggleStatus,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (idno: number) => {
    dispatch(deleteStudent(idno));
  };

  return (
    <>
      {sortedRows.length ? (
        <TableBody>
          {sortedRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: Data) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.idnp}
                style={{
                  backgroundColor: row.status === 'expelled' ? '#f8d7da' : '',
                }}
              >
                {columns.map((column) => {
                  const value =
                    column.id === 'actions'
                      ? null
                      : row[column.id as keyof Data];
                  return column.id === 'actions' ? (
                    <TableCell key={column.id} align={column.align}>
                      <div className="table__action">
                        <Button
                          variant="contained"
                          style={{
                            display: 'block',
                            width: '100%',
                          }}
                          color={row.status === 'enrolled' ? 'info' : 'success'}
                          onClick={() => handleToggleStatus(row.idnp)}
                        >
                          {row.status === 'enrolled' ? 'Expel' : 'Re-enroll'}
                        </Button>
                        <TableModal student={row as Student} />
                        <Button
                          variant="contained"
                          color="error"
                          style={{
                            display: 'block',
                            width: '100%',
                          }}
                          onClick={() => handleDelete(row.idnp)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell key={column.id} align={column.align}>
                      {value !== undefined ? value : 'N/A'}{' '}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      ) : (
        <TableEmpty />
      )}
    </>
  );
};

export default TableContent;
