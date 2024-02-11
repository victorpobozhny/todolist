import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

const initialState: TodolistDomainType[] = []
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionsType): TodolistDomainType[] => {
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
export type TodolistActionsType =
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

export const getTodolistsTC = () => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(res.data.data.item)))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => dispatch(removeTodolistAC(todolistId)))
}

export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(res => dispatch(changeTodolistTitleAC(title, todolistId)))
}


