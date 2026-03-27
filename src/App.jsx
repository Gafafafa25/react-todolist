import {useEffect, useState, useMemo, useCallback} from 'react'
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

    const [darkMode, setDarkMode] = useState(false)
    const [filter, setFilter] = useState("all")
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        console.log("+++")
        fetch(api + "/todos")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
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

    const toggleTask = useCallback((id) => {
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
    }, [])

    const addTask = useCallback((text) => {
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
    }, [])

    const selectAllTasks = useCallback(() => {
        setTasks(tasks => tasks.map(el => ({...el, done: true}))
        )
        fetch(api + "/updateAll", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
    }, [])

    const visibleTasks = useMemo(() => {
        console.log("!")
        if (filter === "all") {
            return tasks
        }
        if (filter === "done") {
            return tasks.filter(task => task.done)
        }
        if (filter === "undone") {
            return tasks.filter(task => !task.done)
        }
    }, [filter, tasks, darkMode])


    const switchMode = () => {
        setDarkMode(!darkMode)
    }

    const contextValue = useMemo(() => {
        return {tasks, addTask, toggleTask, filter, visibleTasks}
    }, [tasks, addTask, toggleTask, filter, visibleTasks])

    return (
        <>
            <TodoContext.Provider value={contextValue}>
                <div>
                    <h1 className={darkMode ? "text-5xl font-semibold text-white mb-4" : "text-5xl font-semibold text-blue-600 mb-4"}>To
                        Do List</h1>
                    <TodoInput/>
                    <button onClick={() => setFilter("all")}
                            disabled={filter === "all"}
                            className={filter === "all" ? "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded cursor-not-allowed opacity-60 transition-colors duration-200" :
                                "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded"}>All
                    </button>
                    <button onClick={() => setFilter("done")}
                            disabled={filter === "done"}
                        // className="mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded "
                            className={filter === "done" ? "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded cursor-not-allowed opacity-60 transition-colors duration-200" :
                                "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded"}
                    >Done
                    </button>
                    <button onClick={() => setFilter("undone")}
                            disabled={filter === "undone"}
                            className={filter === "undone" ? "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded cursor-not-allowed opacity-60 transition-colors duration-200" :
                                "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded"}
                    >Undone
                    </button>
                    {/*//todo: filter ??*/}
                    <button onClick={selectAllTasks}
                            className={filter === "done" ? "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded cursor-not-allowed opacity-60 transition-colors duration-200" :
                                "mt-1 mr-2 mb-2 bg-green-600 text-white  py-2 px-4 rounded"}
                    >All done
                    </button>
                    <button onClick={switchMode}
                            className={darkMode ? "mt-1  mb-2 bg-gray-600 text-white py-2 px-4 rounded " : "mt-1 mb-2 bg-white text-gray-600   py-2 px-4 rounded "}
                    >{darkMode ? "☀️" : "🌙"}
                    </button>
                    <TodoList/>
                </div>
            </TodoContext.Provider>

        </>
    )
}

export default App
