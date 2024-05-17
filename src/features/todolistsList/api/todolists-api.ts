import { UpdateDomainTaskModelType } from "features/TodolistsList/Todolist/Task/model/tasks.reducer";
import { instance } from "common/instance";
import { BaseResponseType } from "common/types";
import { TaskPriorities, TaskStatuses } from "common/enums";

// api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(arg: UpdateTodolistType) {
    return instance.put<BaseResponseType>(`todo-lists/${arg.id}`, { title: arg.title });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: RemoveTaskType) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: CreateTaskArgs) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    });
  },
  updateTask(arg: UpdateTaskArgType) {
    const { todolistId, taskId, domainModel } = arg;
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, domainModel);
  },
};

export type UpdateTodolistType = {
  id: string;
  title: string;
};

export type RemoveTaskType = {
  taskId: string;
  todolistId: string;
};

export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};

export type CreateTaskArgs = {
  todolistId: string;
  title: string;
};

// types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
