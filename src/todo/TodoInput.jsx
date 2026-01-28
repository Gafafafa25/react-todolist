import {useContext, useState} from "react";
import TodoContext from "./TodoContext";

const TodoInput = () => {
    const [value, setValue] = useState("")
    const {addTask} = useContext(TodoContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(value)
        setValue("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="task" value={value} onChange={(e) => {setValue(e.target.value)}}/>
            <button type="submit">
                Add task
            </button>
        </form>
    )
}
export default TodoInput