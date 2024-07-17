import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
interface sidebarprops {
    open: boolean;
    toggle: () => void;
    card?: any
}
const CustomizedDialogs: React.FC<sidebarprops> = ({ open, card, toggle }) => {
    const [val, setVal] = React.useState(card.Description);
    console.log("2");
    return (
        <React.Fragment>

            <BootstrapDialog
                fullWidth
                onClose={toggle}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} maxWidth={'100%'} id="customized-dialog-title">
                    {card.Title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={toggle}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ height: '10%' }}>
                    <Typography gutterBottom>
                        Description:

                        <TextField fullWidth multiline value={val}  ></TextField>
                    </Typography>
                </DialogContent>


            </BootstrapDialog>
        </React.Fragment>
    );
}

export default CustomizedDialogs;