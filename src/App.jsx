import {useState} from 'react'
import TodoContext from "./todo/TodoContext";
import TodoInput from "./todo/TodoInput";
import TodoList from "./todo/TodoList";
import './App.css'


function App() {
    const [tasks, setTasks] = useState([])

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
                text: text,
            done: false
        }
        setTasks([...tasks, newTask])
    }

    return (
        <>
            <TodoContext.Provider value={{addTask, tasks}}>
                <div>
                    <h1>To Do List</h1>
                    <TodoInput/>
                    <TodoList/>
                </div>
            </TodoContext.Provider>

        </>
    )
}

export default App
