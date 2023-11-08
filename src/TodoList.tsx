import React, {FC} from 'react';
import './TodoList.css'
import Button from "./Button";
import Task, {TaskType} from "./Task";

type PropsType = {
    title: string
    tasks: Array<TaskType>
}

const TodoList: FC<PropsType> = ({title, tasks}) => {
    //1.
    // const title = props.title
    // const tasks: Array<TaskType> = props.tasks
    //2.
    //const {title: myTitle, tasks: myTasks} = props
    //3.
    //const {title, tasks} = props --ДЕСТРУКРУТИРУЮЩЕЕ ПРИСВАИВАНИЕ-- перенесли вместо props на входе в компоненту

    const listItems: Array<JSX.Element> = []
    tasks.map(el => {
        listItems.push(<Task id={el.id} title={el.title} isDone={el.isDone}/>)
    })


    // for (let i = 0; i<tasks.length; i++) {
    //     listItems.push(<Task id = {tasks[i].id} title={tasks[i].title} isDone={tasks[i].isDone}/>)
    // }

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
                <Button name={'All'}/>
                <Button name={'Completed'}/>
                <Button name={'Active'}/>
            </div>
        </div>
    );
}

export default TodoList;