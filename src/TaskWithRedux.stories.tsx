import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions';
import { Button } from './stories/Button';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {string} from "prop-types";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import AppWithRedux from "./AppWithRedux";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";
import {TaskWithRedux} from "./TaskWithRedux";
import {TaskType} from "./Todolist";
import {v1} from "uuid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TaskWithRedux> = {
  title: 'Example/TaskWithRedux',
  component: TaskWithRedux,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'left',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const Task = () => {
  let task = useSelector<AppRootStateType, TaskType>(state=>state.tasks['todolistId1'][0])
  if (!task.id) task.id =  v1();
  // {id: v1(), title: 'Default Task', isDone: true}
  return <TaskWithRedux taskId={task.id} todolistId={'todolistId1'}  />
}
export const TaskWithReduxStory: Story = {
    render: () => <Task/>
};
