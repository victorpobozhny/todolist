import React from "react";
import {AppRootStateType} from "./store";
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/todolistsList/tasks-reducer";
import {todolistsReducer} from "../features/todolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {


    todolists: [
        {id: 'todolistId1', title: "What to learn", filter: "all", order: 0, addedDate: new Date()},
        {id: 'todolistId2', title: "What to buy", filter: "all", order: 1, addedDate: new Date()}
    ],
    tasks: {
        ['todolistId1']: [
            {
                description: 'string',
                title: "HTML&CSS",
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: new Date(),
                deadline: new Date(),
                id: v1(),
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date()
            },
            {
                description: 'string1',
                title: "JS",
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: new Date(),
                deadline: new Date(),
                id: v1(),
                todoListId: 'todolistId1',
                order: 1,
                addedDate: new Date()
            }
        ],
        ['todolistId2']: [
            {
                description: 'string2',
                title: "Milk",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: new Date(),
                deadline: new Date(),
                id: v1(),
                todoListId: 'todolistId2',
                order: 1,
                addedDate: new Date()
            },
            {
                description: 'string3',
                title: "React Book",
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.High,
                startDate: new Date(),
                deadline: new Date(),
                id: v1(),
                todoListId: 'todolistId2',
                order: 2,
                addedDate: new Date()
            }
        ]
    }
};
// as AppRootStateType
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType & undefined);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}