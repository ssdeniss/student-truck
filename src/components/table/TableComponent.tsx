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
const initialRows = [
  createData('Mikel Frederich', '01.09.1973', 'enrolled', 2005002334569),
  createData('Mikesl Frederichs', '01.09.2024', 'enrolled', 2115002334569),
  createData('Arnold Cornelius', '02.12.2001', 'expelled', 2005002334568),
  createData('Valentino Gosling', '22.04.1999', 'expelled', 2005002334567),
  createData('Jacqueline Clark', '25.07.1968', 'expelled', 2005002334868),
  createData('Justin Bonilla', '23.05.1964', 'expelled', 2005002334734),
  createData('Pamela Patterson', '23.08.1994', 'expelled', 2005002334874),
  createData('Alexander Pierce', '22.05.1950', 'expelled', 2005002334385),
  createData('James Barber', '11.08.1965', 'expelled', 2005002334032),
  createData('Erin Morgan', '22.08.1946', 'enrolled', 2005002334099),
  createData('George Murphy', '14.05.1994', 'expelled', 2005002334295),
  createData('Faith Solis', '14.05.1989', 'enrolled', 2005002334422),
  createData('Stephen Thomas', '18.02.1971', 'enrolled', 2005002334827),
  createData('Carol Hampton', '24.01.1952', 'enrolled', 2005002334687),
  createData('Amy Choi', '15.01.2000', 'enrolled', 2005002334101),
  createData('Scott Thompson', '07.12.1972', 'enrolled', 2005002334028),
  createData('James Tucker', '24.11.1960', 'expelled', 2005002334803),
  createData('Dustin Russell', '01.02.1977', 'enrolled', 2005002334399),
  createData('Pamela Conner', '16.05.1998', 'enrolled', 2005002334150),
  createData('Adrian Lee', '13.01.1991', 'expelled', 2005002334343),
  createData('Marc Moss', '23.11.1976', 'enrolled', 2005002334130),
  createData('Michael Fisher', '07.09.1994', 'enrolled', 2005002334334),
  createData('Kathy Douglas', '18.03.1998', 'enrolled', 2005002334024),
  createData('Robert Page', '06.03.1982', 'enrolled', 2005002334854),
  createData('Elizabeth Stone', '31.08.1948', 'enrolled', 2005002334161),
  createData('Rebecca Hall', '17.02.1948', 'expelled', 2005002334130),
  createData('Charles Martin', '07.04.2003', 'expelled', 2005002334225),
  createData('Adrian Cardenas', '22.05.1956', 'enrolled', 2005002334539),
  createData('Chelsea Francis', '27.05.1962', 'enrolled', 2005002334840),
  createData('Todd Torres', '21.06.1957', 'enrolled', 2005002334313),
  createData('Jodi Rice', '06.02.1954', 'enrolled', 2005002334809),
  createData('Sheila Nguyen', '09.06.1950', 'expelled', 2005002334718),
  createData('Alisha Gonzalez', '19.04.1969', 'expelled', 2005002334857),
  createData('Cody Boone', '14.02.1998', 'expelled', 2005002334670),
  createData('Kevin Fisher', '25.03.1957', 'enrolled', 2005002334017),
  createData('Elizabeth Thomas', '29.07.1951', 'expelled', 2005002334593),
  createData('Holly Black', '28.12.1986', 'enrolled', 2005002334815),
  createData('Laurie Mitchell', '02.10.1992', 'expelled', 2005002334546),
  createData('Charles Bennett', '10.02.1974', 'enrolled', 2005002334081),
  createData('Tiffany Mcgee', '07.02.1950', 'enrolled', 2005002334407),
  createData('Thomas Gilmore', '06.08.1980', 'expelled', 2005002334987),
  createData('Mark Woodard', '13.02.1981', 'expelled', 2005002334090),
  createData('Teresa Johnson', '29.06.1971', 'expelled', 2005002334641),
  createData('Jessica Mcconnell', '06.03.1988', 'enrolled', 2005002334325),
  createData('Jessica Moyer', '31.03.1981', 'enrolled', 2005002334721),
  createData('Sydney Smith', '27.05.1950', 'enrolled', 2005002334435),
  createData('Amber Christensen', '22.04.1962', 'enrolled', 2005002334867),
  createData('Jessica Gordon', '12.08.1983', 'expelled', 2005002334384),
  createData('Mary Davis', '20.11.1946', 'enrolled', 2005002334573),
  createData('Bonnie Odom', '04.05.1948', 'expelled', 2005002334345),
  createData('Brett Williams', '22.08.1964', 'expelled', 2005002334743),
  createData('Matthew Woods', '10.11.1950', 'enrolled', 2005002334883),
  createData('Nicole Davidson', '29.04.2000', 'expelled', 2005002334580),
  createData('Kyle Delgado', '28.01.1985', 'enrolled', 2005002334275),
];

const pagination = [10, 25, 100];
function createData(
  name: string,
  birth: string,
  status: string,
  idnp: number,
): Data {
  return { name, birth, status, idnp };
}

const TableComponent = () => {
  const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pagination[0]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');
  const [searchQueries, setSearchQueries] = useState({
    name: '',
    idnp: '',
    minDate: null as string | null,
    maxDate: null as string | null,
  });

  const [filteredRows, setFilteredRows] = useState(rows);

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
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      if (orderBy === 'idnp') {
        return order === 'asc' ? a.idnp - b.idnp : b.idnp - a.idnp;
      } else if (orderBy === 'birth') {
        return order === 'asc'
          ? a.birth.localeCompare(b.birth)
          : b.birth.localeCompare(a.birth);
      } else {
        return order === 'asc'
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      }
    });
  }, [filteredRows, order, orderBy]);

  useEffect(() => {
    const filtered = filterRows(
      searchQueries.minDate,
      searchQueries.maxDate,
      searchQueries,
    );
    setFilteredRows(filtered);
  }, [searchQueries, rows]);

  const handleSearchQuery = (query: { type: string; value: string }) => {
    setSearchQueries((prev) => ({
      ...prev,
      [query.type]: query.value,
    }));
  };

  const handleToggleStatus = (idnp: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.idnp === idnp
          ? {
              ...row,
              status: row.status === 'enrolled' ? 'expelled' : 'enrolled',
            }
          : row,
      ),
    );
  };

  const handleDateFilter = (minDate: string | null, maxDate: string | null) => {
    setSearchQueries((prev) => ({
      ...prev,
      minDate,
      maxDate,
    }));
  };

  const filterRows = (
    minDate: string | null,
    maxDate: string | null,
    searchQueries: { name: string; idnp: string },
  ) => {
    return initialRows.filter((row) => {
      const birthDate = dayjs(row.birth);
      const isAfterMin = minDate ? birthDate.isAfter(dayjs(minDate)) : true;
      const isBeforeMax = maxDate ? birthDate.isBefore(dayjs(maxDate)) : true;

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
      <TablePagination
        rowsPerPageOptions={pagination}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
