import React from 'react'
import ListItem from './ListItem';

const Completed = ({allCompletedTask, deleteTask, completeTask}) => {


  return (
    <div className='max-h-[740px] overflow-scroll scroll-p-0'>
        <ul className="">
          {allCompletedTask && allCompletedTask.map((each)=>{
              return(
                <>
                  <ListItem key={each.id} task={each} completeTask={completeTask} deleteTask={deleteTask}/>
                </>
              )
          })}
        </ul>
        
        {allCompletedTask && allCompletedTask.length===0 &&
        <div className='rounded-lg h-[130px] m-4 flex justify-center items-center overflow-scroll bg-white text-gray-400'>
          No Completed task
        </div>}


    </div>
  )
}

export default Completed

