import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from "react";
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {

        onChange: {
            description: 'change Editable Span',
            action: 'Editable Span Want to Change'
        },
    },
    //это будет общее свойство для всех компонент/историй
    args: {
        value: 'Editable Span Component'
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpan_Example_1: Story = {};
