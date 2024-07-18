// src/components/Sidebar.tsx
import React, { useEffect } from 'react';
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
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/system';

import { Controller, useForm } from 'react-hook-form';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import DesktopDatePicker from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { CREATE_TASK_STARTED, EDIT_TASK_STARTED } from '../../../actions';
import { IRootReducerShape } from '../../../types';

interface sidebarprops {
  open: boolean;
  onClose: () => void;
  TaskInfo?: any;
  modalType: string;
}
interface ICard {
  Id?: string;
  Title?: string;
  Description?: string;
  Status?: { label: string; value: number } | null;
  DueDate: dayjs.Dayjs;
  CreatedDate?: string;
  UserId?: string;
}
const CreateTaskSidebar: React.FC<sidebarprops> = ({
  open,
  onClose,
  TaskInfo,
  modalType,
}) => {
  const {Loading } = useSelector(
    (state: IRootReducerShape) => state.Common
  );

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICard>();
  console.log(TaskInfo);
  const name = TaskInfo ? 'Edit' : 'Create';
  const edit = TaskInfo ? true : false;
  const onSubmit = (data: any) => {
    console.log(dayjs(data.DueDate, 'DD-MM-YYYY').toDate());
    console.log(data.Description);
    console.log(data);
    data.DueDate = dayjs(data.DueDate, 'DD-MM-YYYY').toDate();
    data.Description = data.Description.replace(/\s\s+/g, ' ');
    data.Status = data.Status.value;
    if (data.Id == 0 || data.Id == '' || (data.Id == undefined && !edit)) {
      dispatch({ type: CREATE_TASK_STARTED, data: data });
    } else {
      dispatch({ type: EDIT_TASK_STARTED, data: data });
    }
    onClose();
  };
  const options = [
    { label: 'Open', value: 1 },
    { label: 'In Progress', value: 2 },
    { label: 'Completed', value: 3 },
  ];
  const task: ICard = {
    Id: '',
    CreatedDate: '',
    Description: '',
    Title: '',
    Status: null,
    DueDate: dayjs(new Date()),
  };
  const status = [
    { value: 0, label: 'Open' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Completed' },
  ];

  const drawerWidth = {
    xs: '80%', // 80% on extra-small
    sm: '60%', // 60% on small
    md: '20%', // 30% on medium
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
  useEffect(() => {
    if (TaskInfo) {
      console.log(TaskInfo);
      reset({
        Id: TaskInfo.Id,
        Title: TaskInfo.Title,
        Description: TaskInfo.Description,
        DueDate: dayjs(TaskInfo.DueDate),
        Status: options.filter((a) => a.value == TaskInfo.Status)[0],
      });
    } else {
      console.log(task);
      task.DueDate = dayjs(new Date());
      reset(task);
      reset({
        DueDate: dayjs(new Date()),
      });
    }
  }, [open, TaskInfo]);

  return (
    <Drawer
      PaperProps={{
        sx: {
          width: {
            xs: '100%', // 80% on extra-small
            sm: '60%', // 60% on small
            md: '30%', // 30% on medium
          },
        },
      }}
      anchor="right"
      open={open}
      onClose={onClose}
    >
      {open && modalType == 'Edit' ? (
        <>
          <AppBar position="static" color="transparent">
            <Toolbar>
              <Grid container>
                <Grid item xs={10} sm={10} md={10}>
                  <Typography variant="h6" sx={{ flexGrow: 1, padding: '3px' }}>
                    {name} Task
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <IconButton
                    onClick={onClose}
                    sx={{ flexGrow: 1, justifyContent: 'right' }}
                  >
                    <CloseIcon></CloseIcon>
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ padding: '10px 20px' }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="Title"
              label="Title"
              autoFocus
              {...register('Title', {
                required: 'Title is required',
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
              sx={{ whiteSpace: 'pre-line' }}
              {...register('Description', {
                required: 'Description is required',
              })}
              error={!!errors.Description}
              helperText={errors.Description ? errors.Description.message : ''}
            />
            <Controller
              name="Status"
              control={control}
              defaultValue={null}
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
                        label="Status"
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
                  required: 'Date and Time are required',
                  validate: {
                    //  future: (value) =>  value.isAfter(dayjs()) || "Cannot select past dates",
                  },
                }}
                render={({ field }) => (
                  <DatePicker
                    defaultValue={dayjs(new Date())}
                    sx={{ margin: '15px 0 0 0', width: '100%' }}
                    label="Due Date"
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
        </>
      ) : (
        <></>
      )}
    </Drawer>
  );
};

export default CreateTaskSidebar;
