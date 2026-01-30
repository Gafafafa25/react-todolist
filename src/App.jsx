import {useEffect, useState} from 'react'
import TodoContext from "./todo/TodoContext";
import TodoInput from "./todo/TodoInput";
import TodoList from "./todo/TodoList";
import './App.css'


function App() {
    const [tasks, setTasks] = useState(() => {
        const lsData = localStorage.getItem("tasks")
        if (lsData) {
            console.log(JSON.parse(lsData))
            return JSON.parse(lsData)
        }
        return []
    })

    const toggleTask = (id) => {
        //todo:
    }

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text: text,
            done: false
        }
        setTasks([...tasks, newTask])
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    return (
        <>
            <TodoContext.Provider value={{tasks, addTask, toggleTask}}>
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
