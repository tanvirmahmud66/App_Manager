import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import SidebarLogo from "./assets/apps.png";
import TaskLogo from './assets/completed-task.png'
import weatherLogo from './assets/cloudy.png'
import QuizLogo from './assets/quiz.png'
import TaskManager from "./pages/task_manager/TaskManager";
import Weather from "./pages/weather/Weather";
import mapLogo from './assets/map.png'
import { useContext, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Verified from "./components/Verified";
import QuizApp from "./pages/quiz/QuizApp";

function App() {

  const [verified, setVerified] = useState(false)
  let {enterApp, user,spinner} = useContext(AuthContext)
  console.log(user)

  return (
    <Router basename="/" className="App">

      

      {(!user & !verified)?

      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto"
                  width={60}
                  src={SidebarLogo}
                  alt="Your Company"
                />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Apps
                </h2>
              </div>

              <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={enterApp}>
                  <div>
                    <div className="">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {spinner?
                      <div role="status">
                          <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                          <span class="sr-only">Loading...</span>
                      </div>:"Goto Apps"  
                    }
                    </button>
                  </div>
                </form>
              </div>

              <Routes>
                <Route path="/verified/:email/:code"  element={<Verified/>}/>
              </Routes>
      </div>

      :<>
      {/* hamburger button */}
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>



      {/* Sidebar */}
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li className="text-2xl">
                  <a href="/" className="flex items-center py-4 px-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src={SidebarLogo} width={40} alt="sidebarLogo"/>
                    <span className="ms-3 ">Apps</span>
                  </a>
              </li>
              <li>
                  <Link to="/" className="text-sm flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src={TaskLogo} width={25} alt="task logo"/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Task Manager</span>
                  </Link>
              </li>
              <li>
                  <Link to="/weather" className="text-sm flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src={weatherLogo} width={25} alt="task logo"/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Weather App</span>
                  </Link>
              </li>
              <li>
                  <Link to="/quiz" className="text-sm flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <img src={QuizLogo} width={25} alt="task logo"/>
                    <span className="flex-1 ms-3 whitespace-nowrap">Quiz App</span>
                  </Link>
              </li>
              
            </ul>
        </div>
      </aside>



      {/* main content Area */}

      <div className="p-4 sm:ml-64 min-h-screen">
        <div className="">
            <Routes>
              <Route path='/' element={<TaskManager/>}/>
              <Route path='/weather' element={<Weather/>}/>
              <Route path='/quiz' element={<QuizApp/>}/>
              <Route path='/appname'/>
              <Route path='/appname'/>
              <Route path='/appname'/>
              <Route path='/appname'/>

              <Route path="/verified/:email/:code"  element={<Verified/>}/>
              
            </Routes>
        </div>
      </div>
      </>


      }

    </Router>
  );
}

export default App;
