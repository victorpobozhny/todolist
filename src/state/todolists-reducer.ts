import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistReducerType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(el => ({...el, filter: 'all'}))
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: 'all'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id != action.payload.id);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id == action.payload.id ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id == action.payload.id ? {...el, filter: action.payload.filter} : el)
        default:
            return state
    }
}


export type TodolistReducerType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsType

export type SetTodolistsType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

//---------------ACTION CREATORS-------------

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const
}
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id
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

// --------------THUNK CREATORS --------------
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))

}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => dispatch(addTodolistAC(res.data.data.item)))
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => dispatch(removeTodolistAC(todolistId)))
    }
}
export const updateTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => dispatch(changeTodolistTitleAC(title, todolistId)))
    }
}


