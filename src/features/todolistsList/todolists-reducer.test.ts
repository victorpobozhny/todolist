import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../api/todolist-api";


let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: new Date()},
        {id: todolistId2, title: "What to buy", filter: "all", order: 1, addedDate: new Date()}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolist: TodolistType = {
        id: 'newTodolistId',
        title: 'newTodolistTitle',
        addedDate: new Date,
        order: 0
    }
    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('newTodolistTitle');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});