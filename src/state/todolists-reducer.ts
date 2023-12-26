import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id != action.payload.id);
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action.payload.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id == action.payload.id ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el=>el.id==action.payload.id? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
}


type TodolistReducerType = RemoveTodolistACType | AddTodolistAC | changeTodolistTitleAC | changeTodolistFilterAC

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type AddTodolistAC = ReturnType<typeof addTodolistAC>
type changeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id
        }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}
export const changeTodolistTitleAC = (title: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title,
            id
        }
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}


