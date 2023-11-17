import React, { useState } from 'react'
import TaskLogo from '../../assets/completed-task.png'
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Today from '../../components/taskManager/Today';
import AllHistory from '../../components/taskManager/AllHistory';

const TaskManager = () => {

    const[today, setToday] = useState(true)
    const[completed, setCompleted] = useState(false)
    const[allHistory, setAllHistory] = useState(false)

    const todayHandle = ()=>{
        setToday(true)
        setCompleted(false)
        setAllHistory(false)
    }
    const completedHandle = ()=>{
        setToday(true)
        setCompleted(true)
        setAllHistory(false)
    }
    const AllHistoryHandle = ()=>{
        setToday(false)
        setCompleted(false)
        setAllHistory(true)
    }


  return (
    <>
        <div className='flex justify-between items-center px-4 pt-4'>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <div onClick={todayHandle} class="block py-2 px-3 cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Today</div>
                    </li>
                    <li>
                        <div onClick={completedHandle} class="block py-2 px-3 cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Completed</div>
                    </li>
                    <li>
                        <div onClick={AllHistoryHandle} class="block py-2 px-3 cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">All History</div>
                    </li>
                </ul>
            </div>
            <h1 className='text-2xl flex items-center'>
                <img src={TaskLogo} width={35} alt='taskLogo' className='mr-2'/> Task Manager
            </h1>
        </div>

        {today && <Today completed={completed}/>}
        {allHistory && <AllHistory/>}

    </>
  )
}

export default TaskManager