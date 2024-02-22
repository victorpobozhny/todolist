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
import {Login} from "../features/login/Login";
import {Routes, Route, Navigate} from 'react-router-dom';


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
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h3>PAGE NOT FOUND</h3>}/>
                    <Route path="/*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;