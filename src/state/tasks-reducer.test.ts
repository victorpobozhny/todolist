import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

let startState: TasksStateType
const date = new Date()
beforeEach(()=> {

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
                addedDate: date
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

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.Completed, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(startState['todolistId2'][1].status).toBe(TaskStatuses.New);

});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2",'newTitle', "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].title).toBe('newTitle');
    expect(startState['todolistId2'][1].title).toBe("React Book");
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist", v1());

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