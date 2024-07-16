// src/components/Sidebar.tsx
import React from 'react';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Typography,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Grid,
    Autocomplete,
    FormHelperText,
} from '@mui/material';
import { styled } from '@mui/system';

import App from './App';
import { Controller, useForm } from 'react-hook-form';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import DesktopDatePicker from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

interface sidebarprops {
    open: boolean;
    onClose: () => void;
}
interface ITask {
    Id: number,
    Title: string,
    Description: string,
    Status: { label: string, value: number },
    DueDate: dayjs.Dayjs,
    CreatedDate: string
    UserId: string
}
const CreateTaskSidebar: React.FC<sidebarprops> = ({ open, onClose }) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, control, formState: { errors } } = useForm<ITask>();

    const onSubmit = (data: any) => {
        console.log(dayjs(data.DueDate, 'DD-MM-YYYY').toDate());
        console.log(data.Description.replace(/\s/g, ''));
        console.log(data);
        data.DueDate = dayjs(data.DueDate, 'DD-MM-YYYY').toDate();
        data.Description = data.Description.replace(/\s/g, '');
        data.Status=data.Status.value;
        dispatch({ type: 'CREATE_TASK', data: data });
    }
    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
    ];
    const status = [{ value: 0, label: 'Open' }, { value: 1, label: 'InProgress' }, { value: 2, label: 'Completed' }];
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 }];
    const drawerWidth = {
        xs: '80%',   // 80% on extra-small
        sm: '60%',   // 60% on small
        md: '20%',   // 30% on medium
    };
    //   const reset =()=>{
    //    reset()

    //   }

    const StyledDrawer = styled(Drawer)(({ theme }): any => ({
        width: drawerWidth,
        size: 'sm',
        '& .MuiDrawer-paper': {
            width: drawerWidth,
        },
    }));


    return (

        <Drawer
            PaperProps={{
                sx: {
                    width: {
                        xs: '100%',   // 80% on extra-small
                        sm: '60%',    // 60% on small
                        md: '30%',    // 30% on medium
                    },
                },
            }}
            anchor='right' open={open} onClose={onClose} >
            <AppBar position='static' color='transparent'>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Create Task</Typography>
                    <Button onClick={onClose} sx={{ flexGrow: 1, justifyContent: 'right' }}>Close</Button>

                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ padding: '10px 20px' }}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="Title"
                    label="Title"
                    autoFocus
                    {...register('Title', {
                        required: 'Title is required'


                    })}
                    error={!!errors.Title}
                    helperText={errors.Title ? errors.Title.message : ''}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="Description"
                    label="Description"
                    multiline
                    maxRows={4}
                    autoFocus
                    {...register('Description', {
                        required: 'Description is required'


                    })}
                    error={!!errors.Description}
                    helperText={errors.Description ? errors.Description.message : ''}
                />
                <Controller
                    name="Status"
                    control={control}
                    defaultValue={options[0]}
                    rules={{ required: 'Status is required' }} // Validation rule
                    render={({ field }) => (
                        <>
                            <Autocomplete
                                sx={{ margin: '15px 0 0 0' }}
                                {...field}
                                options={options}
                                getOptionLabel={(option) => option.label}
                                onChange={(_, value) => field.onChange(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select an Option"
                                        variant="outlined"
                                        error={!!errors.Status}
                                        helperText={errors.Status ? errors.Status.message : ''}
                                    />
                                )}
                            />

                        </>
                    )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                        name="DueDate"
                        control={control}

                        rules={{
                            required: "Date and Time are required",
                            validate: {
                                future: (value) => value.isAfter(dayjs()) || "Cannot select past dates",
                            }
                        }}
                        render={({ field }) => (
                            <DatePicker

                                sx={{ margin: '15px 0 0 0', width: '100%' }}
                                label="Select Due Date"
                                value={field.value}
                                onChange={field.onChange}
                                minDate={dayjs()} // Disable past dates and times
                            />
                        )}
                    />
                </LocalizationProvider>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Reset
                        </Button>
                    </Grid>

                </Grid>

            </Box>
        </Drawer>


    );


};


export default CreateTaskSidebar;