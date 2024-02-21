import {tasksAPI, TaskStatuses, TaskType} from "../../api/tasks-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {
    AddTodolistActionType,
    changeEntityStatusAC,
    RemoveTodolistActionType,
    SetTodolistActionType
} from "./todolists-reducer";
import {RequestStatus, setRequestStatus} from "../../app/app-reducer";
import {RESULT_CODE} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";


//--------------TYPES--------------

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatus
}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}
export type TasksActionsType =
    ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatus>
    | SetTodolistActionType | RemoveTodolistActionType | AddTodolistActionType
type ErrorType = {
    statusCode: number,
    messages: [
        {
            message: string,
            field: string
        },
        string
    ],
    error: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    const {type, payload} = action
    switch (type) {
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state, [payload.todolistId]: state[payload.todolistId].map(el => el.id == payload.taskId ?
                    {...el, entityStatus: payload.status} : el)
            }
        case "SET-TASKS":
            return {...state, [payload.todolistId]: payload.tasks.map(el => ({...el, entityStatus: 'idle'}))}
        case "CREATE-TASK":
            return {
                ...state, [payload.todolistId]: [...state[payload.todolistId], {...payload.task, entityStatus: 'idle'}]
            }
        case "REMOVE-TASK":
            const {taskID, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].filter(el => el.id != taskID)}
        case "UPDATE-TASK":
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    status: action.payload.status,
                    title: action.payload.title
                } : el)
            }
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.payload.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[payload.id]
            return newState
        default:
            return state
    }
}

// ---------------ACTION CREATORS-------------------------------------

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: "SET-TASKS",
    payload: {
        tasks,
        todolistId
    }
} as const)
export const createTaskAC = (todolistId: string, task: TaskType) => ({
    type: 'CREATE-TASK',
    payload: {
        task,
        todolistId
    }
} as const)
export const removeTaskAC = (taskID: string, todolistID: string) => ({
    type: 'REMOVE-TASK',
    payload: {taskID, todolistID}
} as const)
export const updateTaskAC = (todolistId: string, taskId: string, status: TaskStatuses, title: string) => ({
    type: "UPDATE-TASK",
    payload: {
        todolistId, taskId, status, title
    }
} as const)

export const changeTaskEntityStatus = (todolistId: string, taskId: string, status: RequestStatus) => {
    return {
        type: 'CHANGE-TASK-ENTITY-STATUS',
        payload: {
            todolistId, taskId, status
        }
    } as const
}

//----------------THUNK CREATORS---------------------------------------

export const getTasksTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setRequestStatus('succeeded'))
        })
        .catch(err => console.log(err))
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(createTaskAC(todolistId, res.data.data.item))
                dispatch(setRequestStatus('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
            dispatch(setRequestStatus('idle'))
        })
        .catch(e => {
            if (axios.isAxiosError<ErrorType>(e)) {
                handleServerNetworkError(e, dispatch)
                dispatch(changeEntityStatusAC(todolistId, 'idle'))
            } else {
                handleServerNetworkError((e as Error), dispatch)
            }
        })
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => dispatch => {
    dispatch(setRequestStatus('loading'))
    dispatch(changeTaskEntityStatus(todolistId, taskId, 'loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setRequestStatus('succeeded'))
            dispatch(changeTaskEntityStatus(todolistId, taskId, 'idle'))
        })
        .catch(e => console.log(e))
}

export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses, title: string): AppThunk =>
    (dispatch,
     getState: () => AppRootStateType) => {
        dispatch(setRequestStatus('loading'))
        dispatch(changeTaskEntityStatus(todolistId, taskId, 'loading'))
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
                dispatch(setRequestStatus('succeeded'))
                dispatch(changeTaskEntityStatus(todolistId, taskId, 'idle'))
            })
                .catch(e => console.log(e))
        }
    }




