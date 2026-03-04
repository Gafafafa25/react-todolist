import {useEffect, useState} from 'react'
import TodoContext from "./todo/TodoContext";
import TodoInput from "./todo/TodoInput";
import TodoList from "./todo/TodoList";
import './App.css'

const api = "http://localhost:3000/api"


function App() {
    // const [tasks, setTasks] = useState(() => {
    //     const lsData = localStorage.getItem("tasks")
    //     if (lsData) {
    //         console.log(JSON.parse(lsData))
    //         return JSON.parse(lsData)
    //     }
    //     return []
    // })

    const [tasks, setTasks] = useState([])
    useEffect(() => {
        console.log("+++")
         fetch(api + "/todos")
             .then((response) => {
             return response.json()
         })
             .then((data) => {
                 console.log(data) //todo преобразовать и добавить в tasks
             })
    }, [])

    // useEffect(() => {
    //     localStorage.setItem("tasks", JSON.stringify(tasks))
    // }, [tasks])

    const toggleTask = (id) => {
        const updatedTasks = []
        for (const task of tasks) {
            if (task.id === id) {
                updatedTasks.push({...task, done: !task.done})
            } else {
                updatedTasks.push(task)
            }
        }
        setTasks(updatedTasks)
    }

    const addTask = (text) => {
        console.log(tasks, " before")
        const newTask = {
            id: Date.now(),
            text: text,
            done: false
        }
        setTasks([...tasks, newTask])
    }


    return (
        <>
            <TodoContext.Provider value={{tasks, addTask, toggleTask}}>
                <div>
                    <h1 className="text-green-500">To Do List</h1>
                    <TodoInput/>
                    <TodoList/>
                </div>
            </TodoContext.Provider>

        </>
    )
}

export default App
