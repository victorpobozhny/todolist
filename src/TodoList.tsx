import React, {memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>

    //task
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

    //todolist
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
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

    let tasks = props.tasks;
    useMemo(() => {

        if (props.filter === "active") {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone);
        }
        return tasks
    }, [props.filter, props.tasks])


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
                    //tasks: Array<TaskType>
                    return <TaskWithRedux key={t.id} todolistId={props.id} taskId={t.id}/>
                    // return <Task key={t.id}
                    //              task={t}
                    //              todolistId={props.id}
                    //              changeTaskStatus={props.changeTaskStatus}
                    //              changeTaskTitle={props.changeTaskTitle}
                    //              removeTask={props.removeTask}
                    // />
                })
            }
        </div>
        <div>
            <MyButton variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}
                      color={'inherit'} name={'All'}/>
            <MyButton variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}
                      color={'primary'} name={'Active'}/>
            <MyButton variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}
                      color={'secondary'} name={'Completed'}/>
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