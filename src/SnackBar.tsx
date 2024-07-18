// src/components/Snackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from './snackbarReducer';

const CustomSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state: any) => state.snackbar
  );

  
  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  const vertical = 'bottom';
  const horizontal = 'center';
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
