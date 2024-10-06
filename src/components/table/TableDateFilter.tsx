import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Popper } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import Icon from '../Icon';
import { DateFilterProps } from './tableInterface';

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [minDate, setMinDate] = useState<Dayjs | null>(null);
  const [maxDate, setMaxDate] = useState<Dayjs | null>(null);

  const handleFilterOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSearchOpen((prev) => !prev);
  };

  const handleFilter = () => {
    onFilter(
      minDate ? minDate.toISOString() : null,
      maxDate ? maxDate.toISOString() : null,
    );
  };

  return (
    <>
      <Button onClick={handleFilterOpen}>
        <Icon name="calendar" />
      </Button>
      <Popper
        anchorEl={anchorEl}
        placement="bottom"
        className="table__search"
        open={searchOpen}
        disablePortal={false}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <DatePicker
              label="Min Date"
              value={minDate}
              onChange={(newValue) => setMinDate(newValue)}
            />
            <DatePicker
              label="Max Date"
              value={maxDate}
              onChange={(newValue) => setMaxDate(newValue)}
            />
            <Button onClick={handleFilter}>Filter</Button>
          </div>
        </LocalizationProvider>
      </Popper>
    </>
  );
};

export default DateFilter;
