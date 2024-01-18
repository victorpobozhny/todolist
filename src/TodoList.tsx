import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])


    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const onClickHandler = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const onChangeHandler = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    }, [props.changeTaskStatus, props.id])
    const onTitleChangeHandler = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }, [props.changeTaskTitle, props.id])


    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
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
                tasks.map(t => {


                    return <Task key={t.id}
                                 task={t}
                                 onChangeHandler={onChangeHandler}
                                 onTitleChangeHandler={onTitleChangeHandler}
                                 onClickHandler={onClickHandler}
                    />
                })
            }
        </div>
        <div>
            <MyButton variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler} color={'inherit'} name={'All'}/>
            <MyButton variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler} color={'primary'} name={'Active'}/>
            <MyButton variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler} color={'secondary'} name={'Completed'}/>
        </div>
    </div>
})
type ButtonColorType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
type ButtonVariantType = "text" | "outlined" | "contained" | undefined
type ButtonPropsType = {
    variant: ButtonVariantType
    onClick: () => void
    color: ButtonColorType
    name: string
}

const MyButton = memo((props: ButtonPropsType) => {
    return (
        <Button variant={props.variant}
                onClick={props.onClick}
                color={props.color}>
            {props.name}
        </Button>
    )
})