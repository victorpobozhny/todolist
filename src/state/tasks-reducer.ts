import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>




type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    const {type, payload} = action
    switch (type) {

        case "REMOVE-TASK": {
            const {taskID, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].filter(el => el.id != taskID)}
        }

        case "ADD-TASK": {
            const {title, todolistID} = payload
            return {
                ...state, [todolistID]: [{id: v1(), title: title, isDone: false},
                    ...state[todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            const {taskID, isDone, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].map(el=>el.id==taskID? {...el, isDone: isDone} :el)}
        }
        case "CHANGE-TASK-TITLE": {
            const {taskID, title, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].map(el=>el.id==taskID? {...el, title: title} :el)}
        }

        case "ADD-TODOLIST": {
            const {title, todolistID} = payload
            return {...state, [todolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            const {id} = payload
            const newState={...state}
            delete newState[id]
            return newState
        }


        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', payload: {taskID, todolistID}} as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistID}} as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskID, isDone, todolistID
        }
    } as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            taskID, title, todolistID
        }
    } as const
}





