import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const TaskWithRedux = memo((props: TaskPropsType) => {
    console.log('task')

    //два варианта найти таску . find может вернуть undefined поэтому указываем as TaskType
    //const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todolistId].filter(el => el.id == props.taskId)[0])
    const task = useSelector<AppRootStateType, TaskType>(state=>state.tasks[props.todolistId].find(el=>el.id==props.taskId) as TaskType)
    const dispatch = useDispatch()
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, props.todolistId))
    }
    const changeTaskTitle = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, props.todolistId))
    }
    const removeTask = () => {
        dispatch(removeTaskAC(task.id, props.todolistId))
    }
    return (
        <div className={task.isDone ? "is-done" : ""}>

            <Checkbox
                color={"primary"}
                checked={task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})

