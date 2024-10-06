import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addStudent, Student } from '../../redux/reducers/studentsReducer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const TableModal = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [birth, setBirth] = useState<dayjs.Dayjs | null>(null);
  const [idnp, setIdnp] = useState<string>('');
  const [status, setStatus] = useState<'enrolled' | 'expelled'>('enrolled');
  const [nameError, setNameError] = useState<string | null>(null);
  const [birthError, setBirthError] = useState<string | null>(null);
  const [idnpError, setIdnpError] = useState<string | null>(null);

  const onClose = () => {
    setOpenModal(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setBirth(null);
    setIdnp('');
    setStatus('enrolled');
    setNameError(null);
    setBirthError(null);
    setIdnpError(null);
  };

  const isValidName = (name: string): boolean => /^[A-Za-z\s]+$/.test(name);
  const isValidIDNP = (idnp: string): boolean => /^\d{13}$/.test(idnp);

  const handleAdd = () => {
    let hasError = false;
    setNameError(null);
    setBirthError(null);
    setIdnpError(null);

    if (!name) {
      setNameError('Name is required.');
      hasError = true;
    } else if (!isValidName(name)) {
      setNameError('Name must contain only letters.');
      hasError = true;
    }

    if (!birth) {
      setBirthError('Birth date is required.');
      hasError = true;
    }

    if (!idnp) {
      setIdnpError('IDNP is required.');
      hasError = true;
    } else if (!isValidIDNP(idnp)) {
      setIdnpError('IDNP must be exactly 13 digits.');
      hasError = true;
    }

    if (hasError) return;

    const newStudent: Student = {
      idnp: Number(idnp),
      name,
      birth: dayjs(birth).format('DD.MM.YYYY'),
      status,
    };

    dispatch(addStudent(newStudent));

    resetForm();
    onClose();
  };

  return (
    <>
      <Button
        className="table__modal-add"
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add Student +
      </Button>
      <Modal open={openModal} onClose={onClose}>
        <Box
          sx={{
            width: 400,
            padding: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h2>Add Student</h2>

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!nameError}
          />
          {nameError && (
            <Typography color="error" variant="caption">
              {nameError}
            </Typography>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="table__search-dates">
              <DatePicker
                label="Birth Date"
                format="DD.MM.YYYY"
                value={birth}
                onChange={(newValue) => setBirth(newValue)}
              />
            </div>
          </LocalizationProvider>
          {birthError && (
            <Typography color="error" variant="caption">
              {birthError}
            </Typography>
          )}

          <TextField
            label="IDNP"
            value={idnp}
            onChange={(e) => setIdnp(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 13 }}
            error={!!idnpError}
          />
          {idnpError && (
            <Typography color="error" variant="caption">
              {idnpError}
            </Typography>
          )}

          <FormControl fullWidth margin="normal">
            <Select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'enrolled' | 'expelled')
              }
            >
              <MenuItem value="enrolled">Enrolled</MenuItem>
              <MenuItem value="expelled">Expelled</MenuItem>
            </Select>
          </FormControl>

          <div className="table__search-buttons">
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add student
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TableModal;
