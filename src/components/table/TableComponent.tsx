import { useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';
import TableHeader from './TableHeader';
import { Column, Data } from './tableInterface';
import TableContent from './TableContent';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/reducers/tableFilterReducer';
import { RootState } from '../../redux/reducers/rootReducer';
import { CircularProgress } from '@mui/material';
import { updateStudentStatus } from '../../redux/reducers/studentsReducer';

dayjs.extend(customParseFormat);

const columns: readonly Column[] = [
  {
    id: 'name',
    label: 'Name and surname',
    minWidth: 170,
    sort: true,
    search: true,
  },
  { id: 'birth', label: 'Birth year', minWidth: 100, sort: true },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'idnp', label: 'IDNP', minWidth: 170, sort: true, search: true },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

const pagination = [10, 25, 100];

const TableComponent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pagination[0]);
  const { minDate, maxDate, name, idnp, order, orderBy } = useSelector(
    (state: RootState) => state.filterSlice,
  );
  const students = useSelector(
    (state: RootState) => state.studentSlice.students,
  );

  useEffect(() => {
    const fetchFilteredRows = async () => {
      setLoading(true);
      const filtered = filterRows(minDate, maxDate, { name, idnp });
      setFilteredRows(filtered);
      setLoading(false);
    };

    fetchFilteredRows();
  }, [minDate, maxDate, name, idnp, students]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    dispatch(setFilter({ order: isAsc ? 'desc' : 'asc', orderBy: property }));
  };

  const handleSearchQuery = (query: { type: string; value: string }) => {
    dispatch(setFilter({ [query.type]: query.value }));
  };

  const handleDateFilter = (minDate: string | null, maxDate: string | null) => {
    dispatch(setFilter({ minDate, maxDate }));
  };

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      if (orderBy === 'idnp') {
        return order === 'asc'
          ? Number(a.idnp) - Number(b.idnp)
          : Number(b.idnp) - Number(a.idnp);
      } else if (orderBy === 'birth') {
        const dateA = dayjs(a.birth, 'DD.MM.YYYY');
        const dateB = dayjs(b.birth, 'DD.MM.YYYY');
        return order === 'asc' ? dateA.diff(dateB) : dateB.diff(dateA);
      } else if (orderBy === 'name') {
        return order === 'asc'
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      }
      return 0;
    });
  }, [filteredRows, order, orderBy]);

  const handleToggleStatus = (idnp: number) => {
    setFilteredRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.idnp === idnp) {
          const newStatus = row.status === 'enrolled' ? 'expelled' : 'enrolled';
          const actionMessage =
            newStatus === 'enrolled'
              ? `${row.name} has been enrolled.`
              : `${row.name} has been expelled.`;

          enqueueSnackbar(actionMessage, {
            variant: newStatus === 'enrolled' ? 'success' : 'error',
          });

          dispatch(updateStudentStatus({ idnp, status: newStatus }));

          return { ...row, status: newStatus };
        }
        return row;
      });
      return updatedRows;
    });
  };

  const filterRows = (
    minDate: string | null,
    maxDate: string | null,
    searchQueries: { name: string; idnp: string },
  ) => {
    return students.filter((row) => {
      const birthDate = dayjs(row.birth, 'DD.MM.YYYY');
      const minDayjs = minDate ? dayjs(minDate) : null;
      const maxDayjs = maxDate ? dayjs(maxDate) : null;

      const isAfterMin = minDayjs ? birthDate.isAfter(minDayjs) : true;
      const isBeforeMax = maxDayjs ? birthDate.isBefore(maxDayjs) : true;

      const matchesName = searchQueries.name
        ? row.name.toLowerCase().includes(searchQueries.name.toLowerCase())
        : true;
      const matchesIdnp = searchQueries.idnp
        ? row.idnp.toString().includes(searchQueries.idnp)
        : true;

      return isAfterMin && isBeforeMax && matchesName && matchesIdnp;
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader
              columns={columns}
              orderBy={orderBy}
              order={order}
              handleRequestSort={handleRequestSort}
              handleSearchQuery={handleSearchQuery}
              handleDateFilter={handleDateFilter}
            />
            <TableContent
              sortedRows={sortedRows}
              page={page}
              rowsPerPage={rowsPerPage}
              columns={columns}
              handleToggleStatus={handleToggleStatus}
            />
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={pagination}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
