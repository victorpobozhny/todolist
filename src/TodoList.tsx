import React, {ChangeEvent, ChangeEventHandler,KeyboardEvent, FC, useRef, useState} from 'react';
import Button from './Button';
import TasksList from './TasksList';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({title, tasks, removeTask, addTask}) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onClickAddTask = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        newTaskTitle && event.key == 'Enter' && onClickAddTask()
    }
    const maxTitleLengthError = newTaskTitle.length > 15

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <Button
                    name="+"
                    onClickHandler={onClickAddTask}
                    disabled={!newTaskTitle || maxTitleLengthError}
                />
                {maxTitleLengthError && <div style={{color: "red"}}>Your Task Title is too Long</div>}
            </div>
            <TasksList tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}

export default TodoList;