import TodoContext from "./TodoContext";
import {useContext} from "react";


const TodoList = () => {
    const {tasks, toggleTask} = useContext(TodoContext)
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)}/>
                    {task.text}
                </li>
            ))}
        </ul>
    )
}
export default TodoList