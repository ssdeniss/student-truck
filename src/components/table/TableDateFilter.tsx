import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Popper, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import Icon from '../Icon';
import { DateFilterProps } from './tableInterface';

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [minDate, setMinDate] = useState<Dayjs | null>(null);
  const [maxDate, setMaxDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    onFilter(
      minDate ? minDate.toISOString() : null,
      maxDate ? maxDate.toISOString() : null,
    );
  };

  const clearFilter = () => {
    setMinDate(null);
    setMaxDate(null);
    setError(null);
    onFilter(null, null);
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
