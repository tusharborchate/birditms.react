import { AppBar, Box, Button, Card, CardActions, CardContent, Container, Fab, Grid, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import CreateTaskSidebar from "../../CreateTaskSidebar";
import { useState } from "react";

export const Home = () => {
    const cards = []
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
    }
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
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
                
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {card.title}
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
    );
}