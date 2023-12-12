import React, {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    oldTitle: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const activateEditHandler = () => {
        setEdit(!edit)
        props.callback(title)
    }
    return (
        edit
            ? <input type={"text"}
                     onChange={onChangeHandler}
                     value={title}
                     onBlur={activateEditHandler}
                     autoFocus/>
            : <span onDoubleClick={activateEditHandler}>{title}</span>


    )
}