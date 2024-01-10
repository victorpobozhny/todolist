// import React, {useReducer} from 'react';
// import './App.css';
// import {TaskType, Todolist} from './Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import AppBar from '@mui/material/AppBar/AppBar';
// import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import {Menu} from "@mui/icons-material";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
// import {useDispatch, useSelector} from "react-redux";
// import {AppRootStateType} from "./state/store";
//
//
// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
//
// function AppWithRedux() {
//
//
//     let todolists = useSelector<AppRootStateType, TodolistType[]>(state=>state.todolists)
//     let tasks = useSelector<AppRootStateType, TasksStateType>(state=>state.tasks)
//
//
//     const dispatch = useDispatch()
//
// //    type useReducer--------- <Reducer<TodolistType[], TodolistReducerType>>----- не обязательно
// //     let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
// //         {id: todolistId1, title: "What to learn", filter: "all"},
// //         {id: todolistId2, title: "What to buy", filter: "all"}
// //     ])
// //
// //     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
// //         [todolistId1]: [
// //             {id: v1(), title: "HTML&CSS", isDone: true},
// //             {id: v1(), title: "JS", isDone: true}
// //         ],
// //         [todolistId2]: [
// //             {id: v1(), title: "Milk", isDone: true},
// //             {id: v1(), title: "React Book", isDone: true}
// //         ]
// //     });
//
//
//     function removeTask(id: string, todolistId: string) {
//         dispatch(removeTaskAC(id, todolistId))
//     }
//
//     function addTask(title: string, todolistId: string) {
//         dispatch(addTaskAC(title, todolistId))
//     }
//
//     function changeStatus(id: string, isDone: boolean, todolistId: string) {
//         dispatch(changeTaskStatusAC(id, isDone, todolistId))
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
//         dispatch(changeTaskTitleAC(id, newTitle, todolistId))
//     }
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         dispatch(changeTodolistFilterAC(todolistId, value))
//     }
//
//     function removeTodolist(id: string) {
//         let action = removeTodolistAC(id)
//         dispatch(action)
//     }
//
//     function changeTodolistTitle(id: string, title: string) {
//         dispatch(changeTodolistTitleAC(title, id))
//     }
//
//     function addTodolist(title: string) {
//         let newTodolistId = v1()
//         let action = addTodolistAC(title, newTodolistId)
//         dispatch(action)
//     }
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu />
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: "20px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todolists.map(tl => {
//                             let allTodolistTasks = tasks[tl.id];
//                             let tasksForTodolist = allTodolistTasks;
//
//                             if (tl.filter === "active") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
//                             }
//                             if (tl.filter === "completed") {
//                                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
//                             }
//
//                             return <Grid key={tl.id} item>
//                                 <Paper style={{padding: "10px"}}>
//                                     <Todolist
//                                         key={tl.id}
//                                         id={tl.id}
//                                         title={tl.title}
//                                         filter={tl.filter}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeStatus}
//
//                                         removeTodolist={removeTodolist}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeTodolistTitle={changeTodolistTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithRedux;


import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistCustom} from "./TodolistCustom";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    //let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const dispatch = useDispatch()

//    type useReducer--------- <Reducer<TodolistType[], TodolistReducerType>>----- не обязательно
//     let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ])
//
//     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     });


    // function removeTask(id: string, todolistId: string) {
    //     dispatch(removeTaskAC(id, todolistId))
    // }
    //
    // function addTask(title: string, todolistId: string) {
    //     dispatch(addTaskAC(title, todolistId))
    // }
    //
    // function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //     dispatch(changeTaskStatusAC(id, isDone, todolistId))
    // }
    //
    // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //     dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    // }
    //
    // function changeFilter(value: FilterValuesType, todolistId: string) {
    //     dispatch(changeTodolistFilterAC(todolistId, value))
    // }
    //
    // function removeTodolist(id: string) {
    //     let action = removeTodolistAC(id)
    //     dispatch(action)
    // }
    //
    // function changeTodolistTitle(id: string, title: string) {
    //     dispatch(changeTodolistTitleAC(title, id))
    // }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let action = addTodolistAC(title, newTodolistId)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <TodolistCustom
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

