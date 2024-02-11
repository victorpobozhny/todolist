import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    FilterValuesType,
    getTodolistsTC,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTC
} from "./todolists-reducer";
import {createTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/additemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";

export const TodolistsList: React.FC = () => {
    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    let tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, title))
    }, [dispatch])

    const updateTask = useCallback((taskId: string, todolistId: string, status: TaskStatuses, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, status, title))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(updateTodolistTC(id, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        return (<Grid key={tl.id} item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    updateTask={updateTask}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>)
                    })
                }
            </Grid>
        </>
    );
};