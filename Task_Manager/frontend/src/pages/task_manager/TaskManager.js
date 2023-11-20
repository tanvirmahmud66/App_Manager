import React, { useState } from 'react'
import TaskLogo from '../../assets/completed-task.png'
import Today from '../../components/taskManager/Today';

const TaskManager = () => {

  return (
    <>
        <div className='flex justify-end items-center px-4 pt-4'>
            <h1 className='text-2xl flex items-center'>
                <img src={TaskLogo} width={35} alt='taskLogo' className='mr-2'/> Task Manager
            </h1>
        </div>
        <Today/>
    </>
  )
}

export default TaskManager