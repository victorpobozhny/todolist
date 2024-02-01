import axios from 'axios'

const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1/', withCredentials: true})

export const todolistAPI = {
    getTodos() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodos(payload: { title: string }) {
        return instance.post<CreateTodolistType>('todo-lists', {title: payload.title})
    },
    deleteTodos(payload: { todolistId: string }) {
        return instance.delete(`todo-lists/${payload.todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(
            `todo-lists/${todolistId}`,
            {title: title}
        )
    },
}
// протипизированы только первые 2 запроса

export type TodolistType = {
    id: string
    title: string
    addedDate: Date
    order: number
}

type CreateTodolistType = {
    resultCode: 0
    messages: [],
    data: {
        item: ItemType
    }
}

type ItemType = {
    "id": string
    "title": string
    "addedDate": Date
    "order": number

}