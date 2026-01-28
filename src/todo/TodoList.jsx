import TodoContext from "./TodoContext";
import {useContext} from "react";


const TodoList = () => {
    const {tasks} = useContext(TodoContext)
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>{task.text}</li>
            ))}
        </ul>
    )
}
export default TodoList