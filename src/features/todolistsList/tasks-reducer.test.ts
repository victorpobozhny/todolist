import {createTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";
import {TodolistType} from "../../api/todolist-api";

let startState: TasksStateType
const date = new Date()
beforeEach(() => {

    startState = {
        "todolistId1": [
            {
                description: 'string',
                title: "HTML&CSS",
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: date,
                deadline: date,
                id: '1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: date,
                entityStatus: 'idle'
            },
            {
                description: 'string1',
                title: "JS",
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: date,
                deadline: date,
                id: '2',
                todoListId: 'todolistId1',
                order: 1,
                addedDate: date,
                entityStatus: 'idle'
            }
        ],
        "todolistId2": [
            {
                description: 'string2',
                title: "Milk",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: date,
                deadline: date,
                id: '1',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: date,
                entityStatus: 'idle'
            },
            {
                description: 'string3',
                title: "React Book",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.High,
                startDate: date,
                deadline: date,
                id: '2',
                todoListId: 'todolistId2',
                order: 2,
                addedDate: date,
                entityStatus: 'idle'
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId1");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                description: 'string',
                title: "HTML&CSS",
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: date,
                deadline: date,
                id: '1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: date
            }
        ],
        "todolistId2": [
            {
                description: 'string2',
                title: "Milk",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: date,
                deadline: date,
                id: '1',
                todoListId: 'todolistId2',
                order: 1,
                addedDate: date
            },
            {
                description: 'string3',
                title: "React Book",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.High,
                startDate: date,
                deadline: date,
                id: '2',
                todoListId: 'todolistId2',
                order: 2,
                addedDate: date
            }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const newTask: TaskType = {
        description: '',
        title: 'new Task',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: new Date,
        deadline: new Date,
        id: 'new TaskID',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: new Date
    }
    const action = createTaskAC("todolistId2", newTask);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][2].title).toBe('new Task');
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", TaskStatuses.Completed, 'title');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(startState['todolistId2'][1].status).toBe(TaskStatuses.New);

});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", TaskStatuses.New, 'newTitle');
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].title).toBe('newTitle');
    expect(startState['todolistId2'][1].title).toBe("React Book");
});

test('new array should be added when new todolist is added', () => {
    const newTodolist: TodolistType = {
        id: 'newTodolistId',
        title: 'newTodolistTitle',
        addedDate: new Date,
        order: 0
    }
    const action = addTodolistAC(newTodolist);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});