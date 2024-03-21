import {Dispatch} from 'redux'
import {SetError, SetRequestStatus, setRequestStatus} from "../../app/app-reducer";
import {LoginType} from "./Login";
import {authAPI} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
//import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatus('loading'))
    authAPI.login(data)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setRequestStatus('succeeded'))
                } else {

                    //handleServerAppError<ResponseType<{ userId: number }>>(res.data.data, dispatch)
                }
            }
        )
        .catch((e) => handleServerNetworkError({message: e.message}, dispatch))
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetRequestStatus | SetError