import React, {FC} from 'react';

type ButtonPropsType = {
    name: string
    onClickHandler: () => void
    disabled?: boolean
    classes?: string
}

const Button: FC<ButtonPropsType> = (props) => {
    return (
        <button
            className={props.classes}
            onClick={props.onClickHandler}
            disabled={props.disabled}>
            {props.name}
        </button>
    )
}

export default Button