import TodoContext from "./TodoContext";
import {useContext, useState} from "react";


const TodoList = () => {
    const {tasks, toggleTask} = useContext(TodoContext)

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.done}
                           onChange={() => toggleTask(task.id)}/>
                        <span className={task.done ? "crossOutElement" : ""}>
                            {task.text}
                        </span>
                </li>
            ))}
        </ul>
    )
}
export default TodoList