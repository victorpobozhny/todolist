import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type MyCheckbox = {
    color: ColorType
    checked: boolean
    callback: (checked: boolean) => void

}
type ColorType = "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default" | undefined

export const MyCheckbox = (props: MyCheckbox) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }


    return (
        <Checkbox checked={props.checked} color={props.color} onChange={onChangeHandler}/>
    );
};

