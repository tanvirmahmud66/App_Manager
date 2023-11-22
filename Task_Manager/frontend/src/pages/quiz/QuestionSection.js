import React, {useState, useEffect, useRef} from 'react'
import CheckLogo from '../../assets/check.png'
import WrongLogo from '../../assets/WrongLogo.png'

const QuestionSection = ({questions, questionSection}) => {

    const formRef = useRef()
    const [correctCount, setCorrectCount] = useState(0) 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [nextDisable, setNextDisable] = useState(true)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [finished,setFinished] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const [percentage, setPercentage] = useState(0)

    // suffle
    useEffect(() => {
        shuffleOptions();
    }, [currentQuestionIndex, questions]);

    const shuffleOptions = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const shuffled = options.sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setNextDisable(true)
          setCorrect(false)
          setWrong(false)
          setSubmitted(false)
          formRef.current.reset();
        }
    };

    const showResultHandle = ()=>{
        const result = (correctCount/questions.length)*100
        setPercentage(Math.floor(result))
        setFinished(true)
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    const checkAnswer = (e)=>{
        e.preventDefault()
        console.log(e.target.answer.value)
        setSubmitted(true)
        if(currentQuestion.correct_answer===e.target.answer.value){
            setCorrect(true)
            setCorrectCount(correctCount+1)
        }else{
            setWrong(true)
        }
        setNextDisable(false)
    }


    useEffect(()=>{
        if(currentQuestionIndex===questions.length-1){
            setShowButton(true)
        }
    },[currentQuestionIndex])

  return (
    <div className='h-[88vh] p-4'>
        {!finished?
        <div>
            <div className='text-xl mb-8 flex items-center bg-red-950 text-white p-4 rounded-sm'>
                <>Question {currentQuestionIndex + 1} / {questions.length}</>
                {correct && <img src={CheckLogo} width={30} className='ms-2' alt='check logo'/>}
                {wrong && <img src={WrongLogo} width={32} className='ms-2' alt='check logo'/>}
                
            </div>
            <p className='my-4 ms-4 text-2xl'>{currentQuestion.question}</p>
            <form onSubmit={checkAnswer} ref={formRef}>
                <ul className='ms-4'>
                    {shuffledOptions.map((option, index) => (
                        <li className='my-1' key={index}>
                            <label className='flex items-center'>
                            <input type="radio" name="answer" value={option} />
                            <h6 className={`ms-2 ${(submitted && correct && currentQuestion.correct_answer===option) && "text-green-500"} ${(wrong && currentQuestion.correct_answer!==option)?"text-red-500": `${(submitted && currentQuestion.correct_answer===option) && "text-green-500"}`}`}> {option}</h6>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className='mt-8 w-auto flex items-center'>
                    <button type="submit" class={`border border-green-500 focus:ring-4 focus:${correct ? "ring-green-300":"ring-red-500"} font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"`}>Check Answer</button>
                    {nextDisable? 
                        <button type="button" class="ms-2 text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Next Question</button>
                    :   
                        <>
                            {!showButton? <>
                                <button onClick={handleNextQuestion} type="button" class="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next Question</button>
                            </>:<>
                            <button onClick={showResultHandle} type="button" class="ms-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Show Result</button>
                            </>}
                        </>
                    }
                </div>
            </form>
        </div>:<>
            <h2 className='text-xl mb-8 bg-red-950 text-white p-4 rounded-sm'>Results</h2>
            <div>Total question: {questions.length}</div>
            <div>Correct Answers: {correctCount}</div>
            <div>Wrong Answers: {questions.length-correctCount}</div>
            <div className='py-4'>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div style={{ width: `${percentage}%` }} className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"></div>
                </div>
            </div>
            <button onClick={()=>questionSection(false)} type="button" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Take Quiz Again</button>
        </>}
    </div>
  )
}

export default QuestionSection