import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Chip from '@mui/material/Chip';
import CustomCard from './style';
import ConfirmDialog from '../../common/ConfirmModal';
import CustomizedDialogs from '../../common/Modal';
import CreateTaskSidebar from './CreateTaskSidebar';
import { DELETE_TASK_STARTED, GET_TASK_STARTED } from '../../../actions';
import { IRootReducerShape } from '../../../types';

export const Home = () => {
  interface ICard {
    Id?: string | undefined;
    Title?: string;
    Description?: string;
    DueDate?: string;
    Status: string;
  }
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | undefined>('');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const [task, setTask] = useState<ICard | null>(null);
  const [refreshLoad, setRefreshLoad] = useState(true);
  const toggle = (confirm?: any) => {
    setOpen(!open);
    setModalType('');

    if (confirm && modalType == 'Delete') {
      dispatch({ type: DELETE_TASK_STARTED, data: task?.Id });
    }
    if (open) {
      setTask(null);
    }
  };

  interface ILogin {
    IsAuthenticated: boolean;
    loading: boolean;
    error: string;
    token: string;
    tasks: ICard[];
    refresh: boolean;
  }

  const dispatch = useDispatch();

  const { Tasks, Refresh } = useSelector(
    (state: IRootReducerShape) => state.Task
  );

  const { Loading } = useSelector((state: IRootReducerShape) => state.Common);
  console.log(Refresh);
  useEffect(() => {
    dispatch({ type: GET_TASK_STARTED });
  }, [dispatch]);

  //   const allTasks= useMemo(()=>{
  //     console.log('a');
  //      return tasks.map((a,i)=>{
  //         a.DueDate= a.DueDate?.split('T')[0]
  //      });

  //   },[tasks]);

  console.log(sessionStorage.getItem('jwt'));

  const onEdit = (e: any, card: ICard | null) => {
    console.log(card);
    setTask(card);
    setOpen(true);
    setModalType('Edit');

    // dispatch({ type: 'GET_TASK_BY_ID', data: card.id });
  };
  const onDelete = (e: any, card: ICard) => {
    e.stopPropagation();
    console.log(card);
    setOpen(true);
    setModalType('Delete');
    setTask(card);
  };
  const onOpenModal = (card: ICard) => {
    console.log(card);
    setTask(card);
    setOpen(true);
    setModalType('Open');
  };
  const cards: ICard[] = [];

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container marginBottom={'10px'}>
        <Grid item xs={6} sm={6} md={6}>
          <Typography variant="h5" gutterBottom>
            Tasks
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} sx={{ textAlign: 'right' }}>
          <Button
            onClick={(e) => onEdit(e, null)}
            variant="contained"
            startIcon={<AddTaskOutlinedIcon />}
          >
            Create Task
          </Button>
        </Grid>
      </Grid>
      <Divider />
      {Tasks.length > 0 ? (
        <>
          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            {Tasks.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomCard
                  onMouseEnter={() => setHover(card.Id)}
                  onMouseLeave={() => setHover('')}
                  sx={{ boxSizing: 'border-box' }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <Grid container>
                        <Grid item xs={6} md={6} lg={6}>
                          <Typography variant="h4" noWrap>
                            {card.Title}
                          </Typography>
                        </Grid>
                        {hover == card.Id ? (
                          <>
                            <Grid item xs={2} md={2} lg={2} textAlign={'right'}>
                              <Tooltip title="Expand Task">
                                <IconButton
                                  onClick={() => onOpenModal(card)}
                                  sx={{}}
                                >
                                  <FullscreenIcon color="primary" />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2} textAlign={'right'}>
                              <IconButton
                                onClick={(e) => onEdit(e, card)}
                                sx={{}}
                              >
                                <EditRoundedIcon color="primary" />
                              </IconButton>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2} textAlign={'right'}>
                              <IconButton
                                onClick={(e) => onDelete(e, card)}
                                sx={{}}
                              >
                                <DeleteRoundedIcon color="warning" />
                              </IconButton>
                            </Grid>
                          </>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Typography>
                    <Grid container sx={{ margin: '10 0 0 0' }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="body2" noWrap>
                          {card.Description}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container sx={{ margin: '10px 0 0 0' }}>
                      <Grid item xs={8} sm={8} md={8}>
                        <Typography variant="body2" color="text.secondary">
                          Due by <b>{card.DueDate?.split('T')[0]}</b>
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} textAlign={'right'}>
                        <Chip
                          label={
                            card.Status == '1' ? 'In Progress' : 'Completed'
                          }
                          color={card.Status == '1' ? 'warning' : 'success'}
                          variant={card.Status == '1' ? 'outlined' : 'filled'}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
          {open && modalType == 'Delete' && (
            <ConfirmDialog
              open={open && modalType == 'Delete'}
              text={`Do you want to delete task -  ${task?.Title}?`}
              onClose={toggle}
            ></ConfirmDialog>
          )}
          {open && modalType == 'Open' && (
            <CustomizedDialogs
              open={open && modalType == 'Open'}
              card={task}
              toggle={toggle}
            ></CustomizedDialogs>
          )}
        </>
      ) : Loading ? (
        <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%' }} />
      ) : (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '200px',
            textAlign: 'center',
          }}
        >
          <ContentPasteSearchTwoToneIcon
            sx={{ width: '300px', height: '200px' }}
          ></ContentPasteSearchTwoToneIcon>
          <Typography variant="h6"> You have not created any task. </Typography>
        </Box>
      )}
      <CreateTaskSidebar
        open={open && modalType == 'Edit'}
        modalType={modalType}
        onClose={toggle}
        TaskInfo={task}
      ></CreateTaskSidebar>
    </Container>
  );
};
