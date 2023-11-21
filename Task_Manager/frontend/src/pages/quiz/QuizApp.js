import React, { useState } from 'react'
import QuizLogo from '../../assets/quiz.png'
import QuestionSection from './QuestionSection'

const QuizApp = () => {

    const [number, setNumber] = useState()
    const [category, setCategory] = useState('')
    const [difficulty, setDifficuilty] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [questionSection, setQuestionSection] = useState(false)
    const [questions, setQuestions] = useState()

    let TakeQuiz = async(e) =>{
        e.preventDefault()
        setSpinner(true)
        console.log("category",category)
        console.log("dificulty", difficulty)
        console.log("Number", number)
        let url = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`
        let response = await fetch(url)
        let data = await response.json()
        if(response.status===200){
            setQuestions(data.results)
            setSpinner(false)
            setQuestionSection(true)
            console.log(data)
        }else{
            setSpinner(false)
            alert("Something went wrong :(")
        }
    }

  return (
    <div>
        <div className='p-4 flex items-center justify-end'>
            <img src={QuizLogo} width={35}  alt='Quiz App'/>
            <h3 className='ms-1 text-2xl'>Quiz App</h3>
        </div>
        {!questionSection?
            <div className='h-[88vh] p-4'>
                <div>
                    <form onSubmit={TakeQuiz}>
                        <div>
                            <label for="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Questions:</label>
                            <input type="number" value={number} onChange={(e)=>setNumber(e.target.value)} id="quantity" name='quantity' min='5' max='40' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="number"/>
                        </div>
                        <div className='mt-4'>
                            <label for="category" class="block text-sm mb-2 font-medium leading-6 text-gray-900">Select Category:</label>
                            <div class="">
                                <select value={category} onChange={(e)=>setCategory(e.target.value)}  id="category" name="category" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value='' disabled>Choose Category</option>
                                    <option value={10}>General Knowledge</option>
                                    <option value={17}>Science & Nature</option>
                                    <option value={18}>Computers</option>
                                    <option value={19}>Methematics</option>
                                    <option value={22}>Geography</option>
                                    <option value={23}>History</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label for="difficulty" class="block text-sm mb-2 font-medium leading-6 text-gray-900">Select Difficulty:</label>
                            <div class="">
                                <select value={difficulty} onChange={(e)=>setDifficuilty(e.target.value)} id="difficulty" name="difficulty" autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value='' disabled>Choose Difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-5 flex items-center'>
                            <button type="submit" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                {spinner?<>
                                    <div role="status">
                                        <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </>:"Start Quiz"}
                            </button>
                        </div>
                    </form> 
                </div>
            </div>:<>
                <QuestionSection questions={questions} questionSection={setQuestionSection}/>
            </>
        }
    </div>
  )
}

export default QuizApp