import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, FC, useState} from 'react';
import Button from './Button';
import TasksList from './TasksList';
import icon from './img/icon.png'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({title, tasks, removeTask, addTask, changeTaskStatus}) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [inputError, setInputError] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    const onCollapseHandler = () => {
        setCollapsed(!collapsed)
    }

    const onClickAddTask = () => {
        const trimmedTitle = newTaskTitle.trim()
        trimmedTitle ? addTask(trimmedTitle) : setInputError(true)
        setNewTaskTitle('')
    }
    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        newTaskTitle && event.key == 'Enter' && onClickAddTask()
    }
    const maxTitleLengthError = newTaskTitle.length > 15

    return (
        <div className="todoList">
            <h3>

                <img className={'collapsedHandler'} src={icon} onClick={onCollapseHandler} alt={'collapsed or not'}/>
                {title}

            </h3>

            {collapsed && <div>
                <div>
                    <input className={inputError ? 'inputError' : ''}
                           value={newTaskTitle}
                           onChange={onChangeSetTitle}
                           onKeyDown={onKeyDownHandler}
                    />

                    <Button
                        name="+"
                        onClickHandler={onClickAddTask}
                        disabled={!newTaskTitle || maxTitleLengthError}
                    />
                    {inputError && <div style={{color: "red"}}>YO!</div>}
                    {maxTitleLengthError && <div style={{color: "red"}}>Your Task Title is too Long</div>}
                </div>
                <TasksList tasks={tasks} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>
            </div>}


        </div>
    )
}

export default TodoList;