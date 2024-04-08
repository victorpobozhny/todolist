import { TaskPriorities, TaskStatuses } from "common/enums";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks.reducer";


export type ActionTypeForTest<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
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
export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};


export type RemoveTaskPayloadType = {
  taskId: string,
  todolistId: string
}
export type UpdateTaskArgType = {
  taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string
}

export type CreateTaskPayload = {
  todolistId: string,
  taskTitle: string
}

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};