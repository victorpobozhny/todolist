import React from 'react';
import './App.css';
import TodoList from "./TodoList";

const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true},
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
]
const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
]
function App() {
    const todoListTitle_1 = 'What to learn';
    const todoListTitle_2 = 'What to buy';
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks1}/>
            <TodoList title={todoListTitle_2} tasks={tasks2}/>
        </div>
    );
}

export default App;
