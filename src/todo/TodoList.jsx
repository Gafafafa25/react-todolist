import TodoContext from "./TodoContext";
import {useContext, useState} from "react";


const TodoList = () => {
    const {visibleTasks, toggleTask} = useContext(TodoContext)

    return (
        <ul className="space-y-3 mt-6">
            {visibleTasks.map(task => (
                <li key={task.id} className="flex items-center">
                    <input type="checkbox" checked={task.done}
                           className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
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