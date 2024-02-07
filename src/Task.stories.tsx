import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "./api/tasks-api";
import {v1} from "uuid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: 'Example/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        changeTaskStatus: {
            description: 'change Task Status',
            action: 'clicked  \'change Task Status\' '
        },
        changeTaskTitle: {
            description: 'change Title Status',
            action: 'clicked \'change Title Status\''
        },
        removeTask: {
            description: ' Task Should be Removed',
            action: 'clicked \' Task Should be Removed\''
        }

    },
    //это будет общее свойство для всех компонент/историй
    args: {
        todolistId: '1'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Task_Example_1: Story = {
    args: {
        task: {
            description: 'string',
            title: "HTML&CSS",
            completed: false,
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
            startDate: new Date(),
            deadline: new Date(),
            id: v1(),
            todoListId: 'todolistId1',
            order: 0,
            addedDate: new Date()}
    }
};
export const Task_Example_2: Story = {
    args: {
        task: {
            description: 'string',
            title: "React",
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
    }
};

const TaskToggle = () => {
    const [task, setTask] = useState({
        description: 'string',
        title: "TaskTitle",
        completed: true,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: new Date(),
        deadline: new Date(),
        id: v1(),
        todoListId: 'todolistId1',
        order: 1,
        addedDate: new Date()
    })
    const changeTaskStatus = () => setTask({...task, status: task.status==TaskStatuses.New? TaskStatuses.Completed : TaskStatuses.New})
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => setTask({...task, title: newTitle})



    return <Task
        task={task}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={action(' Remove Task') }
        todolistId={'12121212'}/>
}

export const TaskToggleStory: Story = {
    render: ()=><TaskToggle />
}