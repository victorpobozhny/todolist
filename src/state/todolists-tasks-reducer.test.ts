import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {TodolistType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    const newTodolist: TodolistType = {
        id: 'newTodolistId',
        title: 'newTodolistTitle',
        addedDate: new Date,
        order: 0
    }


    const action = addTodolistAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});