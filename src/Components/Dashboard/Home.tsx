import { AppBar, Box, Button, Card, CardActions, CardContent, Container, Fab, Grid, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import CreateTaskSidebar from "../../CreateTaskSidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }
    interface ILogin {
        IsAuthenticated: boolean,
        loading: boolean,
        error: string,
        token: string,
        tasks: ICard[]
    };

    const dispatch = useDispatch();
    interface ICard {
        title: string,
        description: string
    }
    const { loading, error, token, tasks } = useSelector((state: any): ILogin => state.user);

    useEffect(() => {
        dispatch({ type: 'GET_TASKS' });

    }, [dispatch])
    console.log(sessionStorage.getItem('jwt'))

    const cards: ICard[] = []

    cards.push({ title: 'task1', description: 'task1' })
    cards.push({ title: 'task2', description: 'task2' })

    cards.push({ title: 'task3', description: 'task3' })
    cards.push({ title: 'task1', description: 'task1' })
    cards.push({ title: 'task2', description: 'task2' })

    cards.push({ title: 'task3', description: 'task3' })
    cards.push({ title: 'task1', description: 'task1' })
    cards.push({ title: 'task2', description: 'task2' })

    cards.push({ title: 'task3', description: 'task3' })

    cards.push({ title: 'task1', description: 'task1' })
    cards.push({ title: 'task2', description: 'task2' })

    cards.push({ title: 'task3', description: 'task3' })

    return (
        <>
            <Container sx={{ marginTop: 4 }}>
                <Grid container spacing={2}>

                    {tasks.map((card, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <Grid container>
                                            <Grid item xs={6} md={6} lg={6} >
                                                <Typography>{card.title}</Typography></Grid>

                                            <Grid item xs={6} md={6} lg={6}>
                                                <Typography>{card.title}</Typography></Grid>
                                        </Grid>
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {card.description}
                                    </Typography>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}


                </Grid>
                <Fab
                    color="primary"
                    aria-label="add"
                    variant="circular"
                    sx={{ position: 'fixed', bottom: 16, right: 16, width: 86, height: 86 }}
                    onClick={toggle}
                >
                    Create
                </Fab>

                <CreateTaskSidebar open={open} onClose={toggle}></CreateTaskSidebar>
            </Container>
        </>
    );
}