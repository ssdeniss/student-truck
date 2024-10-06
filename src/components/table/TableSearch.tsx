import React, { useState } from 'react';
import { Input, Popper } from '@mui/material';
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

  const handleSearchOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSearchOpen((prev) => !prev);
  };

  const handleSearch = () => {
    setSearchQuery({
      type: searchType,
      value: searchValue,
    });
    setSearchOpen(false);
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
      <Button onClick={handleSearchOpen}>
        <Icon name="search" />
      </Button>
      <Popper
        anchorEl={anchorEl}
        placement="bottom"
        className="table__search"
        open={searchOpen}
        disablePortal={false}
      >
        <Input
          placeholder={`Search by ${searchType === 'name' ? 'Name' : 'IDNP'}...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleClear}>Clear</Button>
      </Popper>
    </>
  );
};

export default TableSearch;
