import React, {ChangeEvent, FC, useState} from 'react';
import Button from './Button';
import {TaskType} from './TodoList';

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

type FilterValuesType = "all" | "active" | "completed"

const TasksList: FC<TasksListPropsType> = ({tasks, removeTask, changeTaskStatus}) => {
    const [filter, setFilter] = useState<FilterValuesType>("all")


    const filteredTasks: Array<TaskType> = filter === "active"
        ? tasks.filter(t => !t.isDone)
        : filter === "completed"
            ? tasks.filter(t => t.isDone)
            : tasks

    const listItems: JSX.Element = filteredTasks.length === 0
        ? <span>Your list is empty.</span>
        : <ul className={'list'}>
            {
                filteredTasks.map((t: TaskType) => {
                    const onClickRemoveTask = () => removeTask(t.id)
                    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                    return (
                        <li className={t.isDone ? 'task-done' : 'task'}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatus}/>
                            <span>{t.title}</span>
                            <Button name={"x"} onClickHandler={onClickRemoveTask}/>
                        </li>
                    )
                })
            }
        </ul>

    const onClickSetAllFilter = () => setFilter("all")
    const onClickSetActiveFilter = () => setFilter("active")
    const onClickSetCompletedFilter = () => setFilter("completed")

    return (
        <div className="tasksList">
            <div className={'button-container'}>
                <Button
                    name="All"
                    onClickHandler={onClickSetAllFilter}
                    classes={filter === 'all' ? 'btn-active' : 'btn'}
                />
                <Button
                    name="Active"
                    onClickHandler={onClickSetActiveFilter}
                    classes={filter === 'active' ? 'btn-active' : 'btn'}
                />
                <Button
                    name="Completed"
                    onClickHandler={onClickSetCompletedFilter}
                    classes={filter === 'completed' ? 'btn-active' : 'btn'}
                />
            </div>

            <div className="tasksList-info">
                <div>
                    Filter name: {filter}
                </div>
                <div>
                    Number of tasks: {tasks.length}
                </div>
            </div>
            {listItems}

        </div>
    )
}

export default TasksList;