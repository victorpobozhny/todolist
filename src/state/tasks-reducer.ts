import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    const {type, payload} = action
    switch (type) {

        case "REMOVE-TASK": {
            const {taskID, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].filter(el => el.id != taskID)}
        }

        case "ADD-TASK": {
            const {title, todolistID} = payload
            return {
                ...state, [todolistID]: [
                    {
                        description: 'stringNew',
                        title: title,
                        completed: false,
                        status: TaskStatuses.New,
                        priority: TaskPriorities.Middle,
                        startDate: new Date(),
                        deadline: new Date(),
                        id: v1(),
                        todoListId: todolistID,
                        order: 4,
                        addedDate: new Date()
                    }
                    ,
                    ...state[todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            const {taskID, status, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].map(el => el.id == taskID ? {...el, status: status} : el)}
        }
        case "CHANGE-TASK-TITLE": {
            const {taskId, title, todolistId} = payload
            return {...state, [todolistId]: state[todolistId].map(el => el.id == taskId ? {...el, title: title} : el)}
        }

        case "ADD-TODOLIST": {
            const {title, todolistID} = payload
            return {...state, [todolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            const {id} = payload
            const newState = {...state}
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

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskID, status, todolistID
        }
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            taskId, title, todolistId
        }
    } as const
}





