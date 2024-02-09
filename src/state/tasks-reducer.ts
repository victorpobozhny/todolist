import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type CreateTaskActionType = ReturnType<typeof createTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
    RemoveTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | SetTasksType
    | CreateTaskActionType
    | UpdateTaskActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    const {type, payload} = action
    switch (type) {
        case "SET-TASKS": {
            return {...state, [payload.todolistId]: payload.tasks}
        }
        case "CREATE-TASK": {
            return {
                ...state, [payload.todolistId]: [...state[payload.todolistId], payload.task]
            }
        }
        case "REMOVE-TASK": {
            const {taskID, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].filter(el => el.id != taskID)}
        }
        case "UPDATE-TASK":
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    status: action.payload.status,
                    title: action.payload.title
                } : el)
            }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.payload.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
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


// ---------------ACTION CREATORS-------------------------------------
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        payload: {
            tasks,
            todolistId
        }
    } as const
}
export const createTaskAC = (todolistId: string, task: TaskType) => {
    return {
        type: 'CREATE-TASK',
        payload: {
            task,
            todolistId
        }
    } as const
}
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', payload: {taskID, todolistID}} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, status: TaskStatuses, title: string) => {
    return {
        type: "UPDATE-TASK",
        payload: {
            todolistId, taskId, status, title
        }
    } as const
}


//----------------THUNK CREATORS---------------------------------------

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => dispatch(createTaskAC(todolistId, res.data.data.item)))
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(taskId, todolistId)))
}
export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(ts => ts.id === taskId)
        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title, status,
                startDate: task.startDate,
                deadline: task.deadline,
                priority: task.priority,
                description: task.description
            }).then(res => {
                dispatch(updateTaskAC(todolistId, taskId, status, title))
            })
        }
    }
}




