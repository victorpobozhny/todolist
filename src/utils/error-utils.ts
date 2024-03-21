import {SetError, setError, SetRequestStatus, setRequestStatus} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from '../api/tasks-api'

type ErrorType = {
    message: string
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsDispatchType>)=> {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        const defaultError = 'Some Error'
        dispatch(setError(defaultError))
    }
    dispatch(setRequestStatus('failed'))
}

export const handleServerNetworkError = (error: ErrorType, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    dispatch(setRequestStatus('failed'))
    dispatch(setError(error.message))
}

type ErrorUtilsDispatchType = SetRequestStatus | SetError

