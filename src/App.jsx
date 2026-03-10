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
                const data2 = []
                for (const task of data) {
                    const storageTask = {
                        id: task.id,
                        text: task.text,
                        done: task.isDone
                    }
                    data2.push(storageTask)
                }
                setTasks(data2)
            })
    }, [])




    // useEffect(() => {
    //     localStorage.setItem("tasks", JSON.stringify(tasks))
    // }, [tasks])

    const toggleTask = (id) => {
        const updatedTasks = tasks.map(task => task.id === id ? {...task, done: !task.done} : task)
        setTasks(updatedTasks)
        console.log(tasks, " tasks")
        console.log(updatedTasks.find(task => task.id === id))
        fetch(api + "/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTasks.find(task => task.id === id))
        })
    }

    const addTask = (text) => {
        console.log(tasks, " before")
        const newTask = {
            id: Date.now(),
            text: text,
            done: false
        }
        setTasks([...tasks, newTask])
        fetch(api + "/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
    }

    const selectAllTasks = () => {
        setTasks(tasks => tasks.map(el => ({...el, done: true}))
        )
    }

    const deselectAllTasks = () => {
        setTasks(tasks => tasks.map(el => ({...el, done: false}))
        )
    }


    return (
        <>
            <TodoContext.Provider value={{tasks, addTask, toggleTask}}>
                <div>
                    <button onClick={selectAllTasks}>Select all</button>
                    <h1 className="text-green-500">To Do List</h1>
                    <TodoInput/>
                    <TodoList/>
                </div>
            </TodoContext.Provider>

        </>
    )
}

export default App
