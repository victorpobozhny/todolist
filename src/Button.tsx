import React, {FC} from "react";

type ButtonPropsType = {
    name: string
}

const Button: FC<ButtonPropsType> = (props) => {
    return (
        <button>{props.name}</button>
    )
}

export default Button;