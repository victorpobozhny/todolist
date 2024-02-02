import React, {useEffect, useState} from 'react'
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {buttonClasses} from "@mui/material";

export default {
    title: 'TodolistsAPI'
}

export const GetTodolists = () => {
    console.log('GET')
    const [state, setState] = useState<null | TodolistType[]>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return (
        <div>
            <div>
                number of todolists: {state == null ? 0 : state.length}
            </div>
            <br/>
            {state == null ? <div>{JSON.stringify(state)}</div> : state.map(el => <div>{JSON.stringify(el)}</div>)}
        </div>)
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    // useEffect(() => {
    //     const payload = {
    //         title: 'My first todolist'
    //     }
    //     todolistAPI.createTodos(payload)
    //         .then((response) => {
    //             setState(response.data.messages)
    //         })
    // }, [])
    //
    // return <div>{JSON.stringify(state)}</div>
    const addTodolist = () => {
        const payload = {
            title: title
        }
        todolistAPI.createTodos(payload)
            .then((response) => {
                setState(response.data.messages)
            })
        setTitle('')
    }
    return (
        <div>
            <input type={"text"} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <button onClick={addTodolist}>Add New Todolist</button>
            <div>{state == 0 ? 'Success' : state}</div>
        </div>)
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    // useEffect(() => {
    //     const payload = {todolistId: ''}
    //     todolistAPI.deleteTodos(payload)
    //         .then((response) => {
    //             setState(response.data)
    //         })
    // }, [])
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolist = () => {
        const payload = {todolistId: todolistId}
        todolistAPI.deleteTodos(payload)
            .then((response) => {
                setState(response.data)
                console.log(response)
            })
        setTodolistId('')
    }
    return (
        <div>
            <input type={"text"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>Delete todolist</button>
            {JSON.stringify(state)}
        </div>)
}
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = 'c6688781-a6a3-4b3c-bcd4-c9563ecc7091'
//         todolistAPI.updateTodolist(todolistId, 'newNewTitle')
//             .then((response) => {
//                 setState(response.data)
//             })
//
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const updateTodolist = () => {
        const todolistId = 'c6688781-a6a3-4b3c-bcd4-c9563ecc7091'
         todolistAPI.updateTodolist(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
        setTitle('')
    }
    return (
        <div>
            <input type={"text"} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>Update One Todolist title</button>

            {/*<div>{state.messages == 0 ? 'Success' : state.messages}</div>*/}
        </div>)
}

