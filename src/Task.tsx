import React, {FC} from 'react';
export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

const Task: FC<TaskType> = (props) => {
    return (
        <li><input type='checkbox' checked={props.isDone}/>
            <span>{props.title}</span></li>
    )
}

export default Task;