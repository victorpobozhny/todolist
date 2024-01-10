import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {CheckBox} from "./CheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function TodolistCustom(props: PropsType) {

    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))

    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(title, props.id))
    }
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }
    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }
    const changeTaskTitle=(id: string, newTitle: string, todolistId: string)=> {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }
    const onAllClickHandler = () => changeFilter("all", props.id);
    const onActiveClickHandler = () => changeFilter("active", props.id);
    const onCompletedClickHandler = () => changeFilter("completed", props.id);

    const onChangeHandler = (taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskID, isDone, props.id))
    }

    let allTodolistTasks = tasks[props.id];
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => removeTask(t.id, props.id)
                    // уметь переносить наружу map нашу функцию
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    // }
                    const onTitleChangeHandler = (newValue: string) => {
                       changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>

                        <CheckBox isDone={t.isDone} callback={(isDone) => onChangeHandler(t.id, isDone)}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}