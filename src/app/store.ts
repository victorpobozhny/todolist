import { tasksReducer } from "features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "features/TodolistsList/todolistsSlice";
import { combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import { appReducer } from "app/appSlice";
import { authReducer } from "features/Login/authSlice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppRootStateType = ReturnType<typeof rootReducer>;

// ❗ UnknownAction вместо AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
