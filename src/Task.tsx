import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    onChangeHandler: (taskId: string, newIsDoneValue: boolean) => void
    onTitleChangeHandler: (taskId: string, newValue: string) => void
    onClickHandler: (taskId: string) => void
}

export const Task = memo((props: TaskPropsType) => {
    console.log('Task')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.onChangeHandler(props.task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        props.onTitleChangeHandler(props.task.id, newValue)
    }
    const onClickHandler = () => {
        props.onClickHandler(props.task.id)
    }
    return (
        <div className={props.task.isDone ? "is-done" : ""}>

            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})

