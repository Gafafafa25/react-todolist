import {useContext, useRef, useState} from "react";
import TodoContext from "./TodoContext";

const TodoInput = () => {
    const [value, setValue] = useState("")
    const {addTask} = useContext(TodoContext)
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(value)
        setValue("")
        inputRef.current.focus()
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="task" value={value}
                   ref={inputRef}
                   onChange={(e) => {
                setValue(e.target.value)
            }} required/>
            <button type="submit">
                Add task
            </button>
        </form>
    )
}
export default TodoInput