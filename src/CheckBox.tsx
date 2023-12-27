import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type CheckBox = {
    isDone: boolean
    callback: (isDone: boolean) => void
}

export const CheckBox: React.FC<CheckBox> = ({isDone, callback}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }

    return (
        <Checkbox
            color={"primary"}
            checked={isDone}
            onChange={onChangeHandler}
        />
    );
};
