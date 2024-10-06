import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Popper, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Icon from '../Icon';
import { DateFilterProps } from './tableInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFilter } from '../../redux/reducers/tableFilterReducer';

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const { minDate: minDateRedux, maxDate: maxDateRedux } = useSelector(
    (state: RootState) => state.filterSlice,
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [minDate, setMinDate] = useState<Dayjs | null>(null);
  const [maxDate, setMaxDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (minDateRedux) {
      setMinDate(dayjs(minDateRedux));
    }
    if (maxDateRedux) {
      setMaxDate(dayjs(maxDateRedux));
    }
  }, [minDateRedux, maxDateRedux]);

  const handleFilterOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSearchOpen((prev) => !prev);
  };

  const handleFilter = () => {
    if (minDate && maxDate && minDate.isAfter(maxDate)) {
      setError('Min date should be smaller than max date');
      return;
    }
    setError(null);

    const minDateISO = minDate ? minDate.toISOString() : null;
    const maxDateISO = maxDate ? maxDate.toISOString() : null;

    dispatch(setFilter({ minDate: minDateISO, maxDate: maxDateISO }));
    onFilter(minDateISO, maxDateISO);
  };

  const clearFilter = () => {
    setMinDate(null);
    setMaxDate(null);
    setError(null);
    onFilter(null, null);
    dispatch(setFilter({ minDate: null, maxDate: null }));
  };

  return (
    <>
      <Button className="table__search-btn" onClick={handleFilterOpen}>
        <Icon name="calendar" />
      </Button>
      <Popper
        anchorEl={anchorEl}
        placement="bottom"
        className="table__search"
        open={searchOpen}
        disablePortal={false}
      >
        <Button
          className="table__search-close"
          onClick={() => setSearchOpen(false)}
        >
          <Icon name="close" />
        </Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="table__search-content">
            <div className="table__search-dates">
              <DatePicker
                label="Min Date"
                value={minDate}
                onChange={(newValue) => setMinDate(newValue)}
                format="DD.MM.YYYY"
              />
              <DatePicker
                label="Max Date"
                value={maxDate}
                onChange={(newValue) => setMaxDate(newValue)}
                format="DD.MM.YYYY"
              />
            </div>
            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}
            <div className="table__search-buttons">
              <Button onClick={clearFilter} variant="outlined">
                Clear
              </Button>
              <Button onClick={handleFilter} variant="contained">
                Filter
              </Button>
            </div>
          </div>
        </LocalizationProvider>
      </Popper>
    </>
  );
};

export default DateFilter;
