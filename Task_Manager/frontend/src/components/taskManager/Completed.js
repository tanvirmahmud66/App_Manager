import React,{useContext, useState} from 'react'
import checkLogo from '../../assets/check.png'
import OpenModal from './OpenModal';
import ListItem from './ListItem';
import AuthContext from '../../contexts/AuthContext';

const Completed = ({allCompletedTask, deleteTask, completeTask}) => {


  return (
    <div className='max-h-[720px] overflow-scroll scroll-p-0'>
        <ul className="">
          {allCompletedTask && allCompletedTask.map((each)=>{
              return(
                <>
                
                    <ListItem key={each.id} task={each} completeTask={completeTask} deleteTask={deleteTask}/>
                
                
                </>
              )
          })}
        </ul>

        <div className='rounded-lg h-[130px] m-4 flex justify-center items-center overflow-scroll bg-white text-gray-400'>
          No more task
        </div>


    </div>
  )
}

export default Completed

