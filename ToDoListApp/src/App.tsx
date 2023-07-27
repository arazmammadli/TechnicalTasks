import './App.css'
import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './layout/Header'
import { ITodo } from './types/todo'

function App() {
  const [todos,todosSet] = useLocalStorage<ITodo[]>("todos", []);
  return (
    <div className="w-full min-h-screen bg-[#1a1a1a]">
      <Header />
      <div className="w-full relative -top-7">
        <div className="max-w-[46rem] mx-auto">
          <div className="w-full mb-16">
            <TodoAdd todos={todos} todosSet={todosSet} />
          </div>
          <TodoList todos={todos} todosSet={todosSet} />
        </div>
      </div>
    </div>
  )
}

export default App;
