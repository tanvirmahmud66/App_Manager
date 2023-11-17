import React, { useContext, useState } from 'react'
import DateTimeComponent from '../DateTimeComponent'
import AuthContext from '../../contexts/AuthContext'
import TimeComponent from '../TimeComponent'

const OpenModal = ({isOpen, onRequestClose, task, completeTask, deleteTask, getUpdate}) => {

    let {user} = useContext(AuthContext)

    const[editPortal, setEditPortal] = useState(false)

    const [taskBody, setTaskBody] = useState(task.task)

    const editButtonHandle = ()=>{
        setEditPortal(!editPortal)
    }

    const handleTaskBodyChange = (event) => {
        setTaskBody(event.target.value);
    };

    const editTask = async(e, taskId)=>{
        e.preventDefault()
        let response = await fetch(`http://127.0.0.1:8000/api/task/completed/${user?.id}/`,{
            method:"put",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({'task_id':taskId, 'value':e.target.task.value})
        })
        if(response.status===200){
            getUpdate()
            setEditPortal(false)
        }
    }


  return (
    <div class={`${isOpen? "":"hidden"} justify-center items-center w-full pb-2`}>
            <div class="mx-1 bg-white rounded-lg shadow-md dark:bg-gray-700 border border-blue-400">
                <div class="mx-4 my-2 flex items-center justify-between rounded-t dark:border-gray-600">
                    {task.start?
                    <>
                        <p className="me-2 text-xs leading-5 flex items-center justify-center text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 me-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            <DateTimeComponent dateTimeString={task.start} date={true}/>
                        </p>
                        <div className='flex'>
                            <p className="text-xs leading-5 flex items-center justify-center text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 me-1 text-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className='text-xs leading-5 me-1'>Start:</p> 
                                <DateTimeComponent dateTimeString={task.start} time={true}/>
                            </p>
                            {task.end &&
                            <p className="ms-4 text-xs leading-5 flex items-center justify-center text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 me-1 text-green-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className='text-xs leading-5 me-1'>End:</p>
                                <TimeComponent timeString={task.end}/>
                            </p>}
                        </div>
                    </>:
                        <p className='text-xs text-gray-400 leading-5 me-1'>No Schedule</p>
                    }
                    <button onClick={onRequestClose} type="button" class="text-gray-400 bg-transparent  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-5 h-5 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="px-4 pb-2 space-y-4">
                    {editPortal?<>
                        <form onSubmit={(e)=>editTask(e,task.id)}>
                            <div class="">
                                <textarea 
                                    id="task" 
                                    name='task' 
                                    rows="4" 
                                    value={taskBody}
                                    onChange={handleTaskBodyChange}
                                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="New task..." 
                                    required
                                ></textarea>
                            </div>
                            <div className='flex items-center justify-between mt-2'>
                                <div class="flex justify-between items-center">
                                    <input  
                                        name="start" 
                                        type="datetime-local" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    />
                                    <span class="mx-4 text-gray-500">to</span>
                                    <input  
                                        name="end" 
                                        type="time" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    />
                                </div>
                                <button type="submit" class="flex justify-center items-center text-gray-900 bg-white border border-green-400 focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-1 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-4 h-4 text-green-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    <p className='ms-1 text-xs leading-5 text-green-400'>Edit</p>
                                </button>
                            </div>
                        </form>
                    </>:
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {task.task}
                    </p>}
                </div>
                <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <div className='flex items-center'>
                        <input
                                onClick={() => completeTask(task.id)}
                                id={`helper-checkbox-${task.id}`}
                                aria-describedby={`helper-checkbox-text-${task.id}`}
                                type="checkbox"
                                value=""
                                className="w-4 text-blue-600 bg-gray-100 cursor-pointer border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <p className='ms-1 text-xs leading-5'>Complete task</p>
                    </div>
                    <p className="text-xs leading-5 flex items-center justify-center">
                        <svg onClick={editButtonHandle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 cursor-pointer hover:text-blue-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <svg onClick={()=>deleteTask(task.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 ms-2 cursor-pointer hover:text-red-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </p>
                </div>
            </div>
    </div>
  )
}

export default OpenModal