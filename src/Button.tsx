import React, { FC } from 'react';

type ButtonPropsType = {
    name: string
    onClickHandler: () => void
    disabled?: boolean
}

const Button: FC<ButtonPropsType> = (props) => {
    return (
        <button onClick={props.onClickHandler} disabled={props.disabled}>{props.name}</button>
    )
}

export default Button