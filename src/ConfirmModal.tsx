import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

interface IConfirm{
open:boolean,
text:string,
onClose: (confirm:any) => void;

}
const ConfirmDialog :React.FC<IConfirm> =({open,text,onClose}) => {

 

  const handleClose = (confirm:any) => {
    if (confirm) {
      onClose(confirm);
      console.log("Confirmed!");
    } else {
        onClose(confirm);
      console.log("Cancelled!");
    }
  };

  return (
    <div>
     
      <Dialog open={open} onClose={() => onClose(false)} fullWidth>
        <DialogTitle noWrap>{text}</DialogTitle>
      
        <DialogActions>
                    <Button onClick={() => onClose(false)} color="primary">
            Cancel
          </Button>


          
          <Button onClick={() => onClose(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
