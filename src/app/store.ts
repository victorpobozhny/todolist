import {TasksActionsType, tasksReducer} from '../features/todolistsList/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from '../features/todolistsList/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
//создаем кастомный и сразу типизированный хук для useDispatch, чтобы не типизироват его каждый раз при вызове
export const useAppDispatch = useDispatch<AppDispatchType>;
//создаем кастомный и сразу типизированный хук для useSelect, чтобы не типизировать его каждый раз при вызове
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//создаем общий actionsType
export type AppActionsType = TasksActionsType | TodolistsActionsType
//создаем общий тип для санок, чтобы можно было диспатчить не только AC но и другие санки
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;