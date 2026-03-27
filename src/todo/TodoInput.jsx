import {useContext, useEffect, useLayoutEffect, useRef, useState, useId} from "react";
import TodoContext from "./TodoContext";


const TodoInput = () => {
    const [value, setValue] = useState("")
    const {addTask} = useContext(TodoContext)
    const inputRef = useRef(null);
    const inputId = useId()

    useEffect(() => {
        inputRef.current.focus();
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(value)
        setValue("")
        inputRef.current.focus()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={inputId}>Add task:</label>
            <input  type="text" placeholder="task" value={value}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id={inputId}
                   ref={inputRef}
                   onChange={(e) => {
                setValue(e.target.value)
            }} required/>
            <button type="submit"
            className="w-full mt-2 mb-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
                Add task
            </button>
        </form>
    )
}
export default TodoInput