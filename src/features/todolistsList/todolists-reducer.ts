import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";

const initialState: TodolistDomainType[] = []
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
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

// -------------TYPES-------------------------

export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type TodolistsActionsType =
    SetTodolistActionType | RemoveTodolistActionType | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

//---------------ACTION CREATORS-------------

export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    payload: {
        todolists
    }
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todolist
    }
} as const)
export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        id: id
    }
} as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        title,
        id
    }
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id,
        filter
    }
} as const)

// --------------THUNK CREATORS --------------

export const getTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        console.log(e)
    }
}

export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.createTodolist(title)
        dispatch(addTodolistAC(res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.deleteTodolist(todolistId)
        dispatch(removeTodolistAC(todolistId))
    } catch (e) {
        console.log(e)
    }
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    try {
        const res = await todolistAPI.updateTodolist(todolistId, title)
        dispatch(changeTodolistTitleAC(title, todolistId))
    } catch (e) {
        console.log(e)
    }
}


