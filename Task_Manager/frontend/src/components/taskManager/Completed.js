import React from 'react'
import checkLogo from '../../assets/check.png'

const Completed = ({allCompletedTask, deleteTask}) => {
  return (
    <div className='max-h-[720px] overflow-scroll scroll-p-0'>
        <ul className="">
          {allCompletedTask && allCompletedTask.map((each)=>{
              return(
                  <li type='button' key={each.id} data-modal-target={each.id} data-modal-toggle={each.id} className="mx-4 flex justify-between items-center gap-x-6 p-3 border-[1px] border-green-400 rounded-lg hover:cursor-pointer mt-4 bg-white hover:bg-green-100 transition-all duration-200">
                    <div className="flex items-center min-w-0 gap-x-4">
                      <div className="min-w-0 flex justify-center items-center">
                        <div class="flex justify-center items-center">
                          {/* <img src={checkLogo} width={20} alt='check'/> */}
                          <input                    
                              id={`helper-checkbox-${each.id}`}
                              aria-describedby={`helper-checkbox-text-${each.id}`}
                              type="checkbox"
                              value=""
                              checked
                              className="w-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                        <div className='ms-3'>
                          <p className="truncate text-xs leading-5">{each.task}</p>
                        </div>         
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-xs leading-5 flex items-center justify-center">
                        <svg onClick={()=>deleteTask(each.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="ms-2 w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </p>
                    </div>
                  </li>
              )
          })}
        </ul>


    </div>
  )
}

export default Completed

