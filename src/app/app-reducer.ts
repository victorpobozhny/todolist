export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetRequestStatus = ReturnType<typeof setRequestStatus>
export type SetError = ReturnType<typeof setError>
export type Actions = SetRequestStatus | SetError

const initialState = {
    status: 'idle' as RequestStatus,
    error: null as null | string,
}

type InitialState = typeof initialState

export const appReducer = (state: InitialState = initialState, action: Actions): InitialState => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export const setRequestStatus = (status: RequestStatus) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}

export const setError = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}


