import { todolistsAPI, TodolistType, UpdateTodolistType } from "features/TodolistsList/api/todolists-api";
import { appActions, RequestStatusType } from "app/app.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodolists, () => {
        return [];
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
        state.unshift(newTodolist);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.title = action.payload.title;
        }
      });
  },
});

// thunks

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(
  `${slice.name}/fetchTodolists`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.getTodolists();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolists: res.data };
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
  `${slice.name}/removeTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
      dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: "loading" }));
      const res = await todolistsAPI.deleteTodolist(arg.id);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { id: arg.id };
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
  `${slice.name}/addTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.createTodolist(arg.title);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolist: res.data.data.item };
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistType, UpdateTodolistType>(
  `${slice.name}/changeTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const { title, id } = arg;
    try {
      const res = await todolistsAPI.updateTodolist(arg);
      return { id, title };
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle };
