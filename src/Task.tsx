import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = memo((props: TaskPropsType) => {
    console.log('task')
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id,  newIsDoneValue, props.todolistId);
    }
    const changeTaskTitle = (newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    }
    const removeTask = () => {
    props.removeTask(props.task.id, props.todolistId )
    }
    return (
        <div className={props.task.isDone ? "is-done" : ""}>

            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan value={props.task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})

