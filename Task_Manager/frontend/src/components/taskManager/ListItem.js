import React, { useState } from 'react'
import OpenModal from './OpenModal';
import DateTimeComponent from '../DateTimeComponent';

const ListItem = ({task, completeTask, deleteTask, getUpdate}) => {

    let [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


  return (
    <>
        <li onClick={openModal} className={`mx-4 gap-x-6 p-3 border-[1px] border-blue-400 rounded-lg hover:cursor-pointer mt-4 mb-1 ${isOpen? "bg-blue-100":"bg-white"}  hover:bg-blue-100 transition-all duration-200`}>
            <div className='w-full flex justify-between items-center'> 
                <div className="flex items-center min-w-0 gap-x-4">
                    <div className="min-w-0 flex justify-center items-center">
                        <div className='truncate text-xs leading-5'>
                            <p className="">
                                {task.task}
                            </p>
                        </div>         
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-xs leading-5 flex items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-5 h-5 me-1 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <DateTimeComponent dateTimeString={task.created_at} time={true}/>
                    </p>
                </div>
            </div>
            
        </li>
        <OpenModal isOpen={isOpen} onRequestClose={closeModal} task={task} completeTask={completeTask} deleteTask={deleteTask} getUpdate={getUpdate}/> 
    </>
  )
}

export default ListItem