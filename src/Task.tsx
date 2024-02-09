import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/tasks-api";


type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    updateTask: (taskId: string, todolistId: string, status: TaskStatuses, title: string) => void
}

export const Task = memo((props: TaskPropsType) => {
    console.log('task')
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        //--------------------проверить на корректность отправляемого значения----------------------------------
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.updateTask(props.task.id, props.todolistId, newIsDoneValue, props.task.title);
    }
    const changeTaskTitle = (title: string) => {
        props.updateTask(props.task.id, props.todolistId, props.task.status, title)
    }
    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    return (
        <div className={props.task.status == TaskStatuses.Completed ? "is-done" : ""}>

            <Checkbox
                color={"primary"}
                checked={props.task.status == TaskStatuses.Completed}
                onChange={changeTaskStatus}
            />
            <EditableSpan value={props.task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})

