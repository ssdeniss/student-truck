import React, { useState } from 'react';
import { Popper, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Icon from '../Icon';

interface TableSearchProps {
  setSearchQuery: (query: { type: string; value: string }) => void;
  searchType: string;
}

const TableSearch: React.FC<TableSearchProps> = ({
  setSearchQuery,
  searchType,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearchOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSearchOpen((prev) => !prev);
  };

  const searchValidation = (searchValue: string) => {
    if (searchType === 'name' && /\d/.test(searchValue)) {
      setError('Name cannot contain numbers');
      return false;
    }
    if (searchValue.length < 1) {
      setError('Search cannot be empty');
      return false;
    }
    if (searchType === 'idnp' && !/^\d+$/.test(searchValue)) {
      setError('IDNP must contain only numbers');
      return false;
    }
    if (searchType === 'idnp' && searchValue.length > 13) {
      setError('Cannot be longer than 13 characters');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSearch = () => {
    if (searchValidation(searchValue)) {
      setSearchQuery({
        type: searchType,
        value: searchValue,
      });
      setSearchOpen(false);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchQuery({
      type: searchType,
      value: '',
    });
  };

  return (
    <>
      <Button className="table__search-btn" onClick={handleSearchOpen}>
        <Icon name="search" />
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
        <div className="table__search-content">
          <div className="table__search-input">
            <TextField
              label="Search"
              variant="outlined"
              placeholder={`Search by ${searchType === 'name' ? 'Name' : 'IDNP'}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              error={!!error}
            />
            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}
          </div>
          <div className="table__search-buttons">
            <Button onClick={handleClear} variant="outlined">
              Clear
            </Button>
            <Button onClick={handleSearch} variant="contained">
              Search
            </Button>
          </div>
        </div>
      </Popper>
    </>
  );
};

export default TableSearch;
