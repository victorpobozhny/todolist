import React, {FC} from "react";

type ButtonPropsType = {
    name: string
    passedFunction?: () => void
}

const Button: FC<ButtonPropsType> = (props) => {
    return (
        <button onClick={props.passedFunction}>{props.name}</button>
    )
}

export default Button;