import React, { useContext, useEffect, useRef, useState } from 'react'
import Calendar from '../../components/taskManager/Calander'
import AuthContext from '../../contexts/AuthContext'
import Completed from '../../components/taskManager/Completed';
import ListItem from './ListItem';


const Today = () => {

    const formRef = useRef()
    let {user} = useContext(AuthContext)
    const [create, setCreate] = useState(false)
    const [allTask, setAllTask] = useState()
    const [allCompletedTask, setAllCompletedTask] = useState()
    const [spinner, setSpinner] = useState(false)
    
    const BaseUrl = "https://tanvir61.pythonanywhere.com"

    let getTask = async()=>{
        let response = await fetch(`${BaseUrl}/api/task/${user?.id}/`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        let data = await response.json()
        console.log("All: ",data)
        if (response.status===200){
            setAllTask(data)
        }
    }

    let getCompleteTask = async()=>{
        let response = await fetch(`${BaseUrl}/api/task/completed/${user?.id}/`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        let data = await response.json()
        console.log("All: ",data)
        if (response.status===200){
            setAllCompletedTask(data)
        }
    }

    let newTask = async(e)=>{
        e.preventDefault()
        setSpinner(true)
        const formData = {
            task: e.target.task.value,
            start: e.target.start.value || null,
            end: e.target.end.value || null,
        };
        let response = await fetch(`${BaseUrl}/api/task/${user?.id}/`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        })
        let data = await response.json()
        if (response.status===201){
            getTask()
            setCreate(false)
            formRef.current.reset();
            setSpinner(false)
        }
    }

    const completeTask = (taskId, value) => {
        setTimeout(async () => {
          console.log('Task completed with ID:', taskId);
      
          try {
            const response = await fetch(`${BaseUrl}/api/task/${user?.id}/`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ task_id: taskId, isComplete:value }),
            });
            let data = await response.json()
            if (response.status === 302) {
              getTask()
              getCompleteTask()
            //   alert("Completed '"+data.task+"'")
            }
          } catch (error) {
            console.error('Error completing task:', error);
          }
        }, 1000);
      };

    
    // edit task build inside open modal

    const deleteTask = async(taskId) => {
        let response = await fetch(`${BaseUrl}/api/task/completed/${user?.id}/`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'task_id':taskId})
        })
        if(response.status===410){
            getTask()
            getCompleteTask()
        }
    }

    const getUpdate = ()=>{
        getTask()
        getCompleteTask()
    }

    useEffect(()=>{
        console.log(user.email)
        getTask()
        getCompleteTask()
    },[user])


  return (
    <div class="grid lg:grid-cols-2 h-[740px]">

{/* left side */}
            <div className='rounded-lg bg-white overflow-scroll scroll-p-0'>
                <div onClick={()=>setCreate(!create)} className={`mx-4 gap-x-6 rounded-lg hover:cursor-pointer mt-4 mb-1 transition-all duration-200`}>
                    <div className='flex justify-between items-center rounded-lg ps-3 pe-1 py-1 text-xs leading-5 text-gray-400 border-[1px] border-gray-500 cursor-text'>
                        <>new task...</>
                        <button type="button" class="text-white bg-blue-500 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Task</button>
                    </div>
                </div>
                {create &&
                <div className='rounded-lg mx-4'>
                    <div className='border-[2px] border-blue-500 p-2 rounded-lg'>
                        <form onSubmit={newTask} ref={formRef}>
                            <textarea id="task" name='task' rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="write your task here..." required></textarea>
                            <div class="flex justify-between items-center mt-1">
                                <input  
                                    name="start" 
                                    type="datetime-local" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                                <span class="mx-4 text-gray-500">to</span>
                                <input  
                                    name="end" 
                                    type="time" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            </div>
                            {spinner?
                                <button type="submit" class="mt-2 w-full text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <div role="status">
                                        <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </button>:
                                <button type="submit" class="mt-2 w-full text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Task</button>
                            }
                        </form>
                    </div>
                </div>}
                <div className=''>
                    <ul className="">
                        {allTask && allTask.map((each)=>{
                            return(
                                <ListItem key={each.id} task={each} completeTask={completeTask} deleteTask={deleteTask} getUpdate={getUpdate}/>
                            )
                        })}
                    </ul>
                    {(allTask && allTask.length===0) &&
                    <div className='rounded-lg h-[130px] m-4 flex justify-center items-center overflow-scroll bg-white text-gray-400'>
                        No more task
                    </div>}
                </div>
            </div>

{/* right side */}
            <div className='hidden lg:block'>
                <Completed allCompletedTask={allCompletedTask} deleteTask={deleteTask} completeTask={completeTask}/>
            </div>


    </div>
  )
}

export default Today