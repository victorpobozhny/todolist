import React, {FC} from 'react';
import './TodoList.css'
import Button from "./Button";
import {FilterType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskId: number) => void
    changeFilter: (f: FilterType) => void
}
export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

const TodoList: FC<PropsType> = ({title, tasks, deleteTask, changeFilter}) => {
    const listItems: Array<JSX.Element> = []
    tasks.map(el => {
        listItems.push(
            <li><input type='checkbox' checked={el.isDone}/>
                <span>{el.title}</span>
                <Button name={'✖️'} passedFunction={() => {
                    deleteTask(el.id)
                }}/>
            </li>
        )
    })

    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button name={'+'}/>
            </div>
            <ul>
                {listItems}
            </ul>
            <div>
                <Button name={'All'} passedFunction={() => {
                    changeFilter('all')
                }}/>
                <Button name={'Completed'} passedFunction={() => {
                    changeFilter('completed')
                }}/>
                <Button name={'Active'} passedFunction={() => {
                    changeFilter('active')
                }}/>
            </div>
        </div>
    );
}

export default TodoList;