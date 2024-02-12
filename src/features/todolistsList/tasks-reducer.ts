import {tasksAPI, TaskStatuses, TaskType} from "../../api/tasks-api";
import {AppRootStateType, AppThunk} from "../../app/store";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";


//--------------TYPES--------------
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TasksActionsType =
    ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | SetTodolistActionType | RemoveTodolistActionType | AddTodolistActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    const {type, payload} = action
    switch (type) {
        case "SET-TASKS":
            return {...state, [payload.todolistId]: payload.tasks}
        case "CREATE-TASK":
            return {
                ...state, [payload.todolistId]: [...state[payload.todolistId], payload.task]
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


//----------------THUNK CREATORS---------------------------------------

export const getTasksTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const res = await tasksAPI.getTasks(todolistId)
        dispatch(setTasksAC(todolistId, res.data.items))
    } catch (e) {
        console.log(e)
    }
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    try {
        const res = await tasksAPI.createTask(todolistId, title)
        dispatch(createTaskAC(todolistId, res.data.data.item))
    } catch (e) {
        console.log(e)
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    try {
        const res = await tasksAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(taskId, todolistId))
    } catch (e) {
        console.log(e)
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses, title: string): AppThunk =>
    async (dispatch,
           getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(ts => ts.id === taskId)
        if (task) {
            try {
                const res = await tasksAPI.updateTask(todolistId, taskId, {
                    title, status,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    priority: task.priority,
                    description: task.description
                })
                dispatch(updateTaskAC(todolistId, taskId, status, title))
            } catch (e) {
                console.log(e)
            }
        }
    }




