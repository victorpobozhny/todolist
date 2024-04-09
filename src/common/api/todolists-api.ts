import axios from "axios";
import { GetTasksResponse, ResponseType, TaskType, TodolistType } from "common/types";
import {
  CreateTaskPayload,
  LoginParamsType,
  RemoveTaskPayloadType,
  UpdateTaskArgType,
  UpdateTodolistPayloadType
} from "common/types/types";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "1cdd9f77-c60e-4af5-b194-659e4ebd5d41"
  }
};
const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings
});

// api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(payload: UpdateTodolistPayloadType) {
    return instance.put<ResponseType>(`todo-lists/${payload.id}`, { title: payload.title });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(payload: RemoveTaskPayloadType) {
    return instance.delete<ResponseType>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`);
  },
  createTask(payload: CreateTaskPayload) {
    return instance.post<ResponseType<{
      item: TaskType
    }>>(`todo-lists/${payload.todolistId}/tasks`, { title: payload.taskTitle });
  },
  updateTask(payload: UpdateTaskArgType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`, payload.domainModel);
  }
};


export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType>("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("auth/me");
  }
};

// types

