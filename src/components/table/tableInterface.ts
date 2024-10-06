export interface Data {
  name: string;
  birth: string;
  status: string;
  idnp: number;
}

export interface Column {
  id: keyof Data | 'actions';
  label: string;
  align?: 'left' | 'center' | 'right';
  minWidth?: number;
  sort?: boolean;
  search?: boolean;
}

export interface TableContentProps {
  sortedRows: Data[];
  page: number;
  rowsPerPage: number;
  columns: readonly Column[];
  handleToggleStatus: (idnp: number) => void;
}

export interface TableHeaderProps {
  columns: readonly Column[];
  orderBy: keyof Data;
  order: 'asc' | 'desc';
  handleRequestSort: (property: keyof Data) => void;
  handleSearchQuery: (query: { type: string; value: string }) => void;
  handleDateFilter: any;
}

export interface DateFilterProps {
  onFilter: (minDate: string | null, maxDate: string | null) => void;
}
