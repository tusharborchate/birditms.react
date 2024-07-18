import React from 'react';
import { Button, Typography, Container, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
const CustomCard = styled(Card)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
    borderBottom: '4px solid #1976d2',
    marginBottom: -4,
  },
}));

export default CustomCard;
