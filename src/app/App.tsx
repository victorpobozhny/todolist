import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {Menu} from "@mui/icons-material";
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {useAppSelector} from "./store";
import {CustomizedSnackbars} from "../components/errorSnackBar/CustomizedSnackbars";


function App() {
    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {
                status == 'loading' && <LinearProgress color="secondary"/>
            }
            <CustomizedSnackbars/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;