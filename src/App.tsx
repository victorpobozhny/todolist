import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])
    const deleteTask = (taskId: number) => {
        return (
            setTasks(tasks.filter(el => el.id !== taskId))
        )
    }

    const todoListTitle_1 = 'What to learn';

    const [filter, setFilter] = useState<FilterType>('all')
    let tasksForTodolist = tasks
    if (filter == 'active') {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }
    if (filter == 'completed') {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    const changeFilter = (filterName: FilterType) => {
        setFilter(filterName)
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasksForTodolist} deleteTask={deleteTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
