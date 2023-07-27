import { useMemo } from "react";
import { ITodo } from "../types/todo";
import TodoItem from "./TodoItem";

type ITodoListProps = {
    todos: ITodo[];
    todosSet: React.Dispatch<React.SetStateAction<ITodo[]>>
}

// function TodoListItems({ todos, todosSet }: ITodoListProps) {

//     return (
//         <>
//             {
//                 todos.map((todo) => (
//                     <div key={todo.id} className="bg-[#262626] rounded-lg py-4 px-4 relative mb-4 last:mb-0">
//                         <div className="flex flex-row justify-between">
//                             <div className="flex flex-row gap-3 items-start">
//                                 <div className="min-w-[24px] min-h-[24px] relative top-[4px]">
//                                     {
//                                         !todo.completed ? <div onClick={() => todosSet(toggleTodo(todos, todo.id))} className="w-4 h-4 cursor-pointer mx-auto border-2 border-solid border-[#4ea8de] rounded-[50%]"></div>
//                                             : <div className="cursor-pointer" onClick={() => todosSet(toggleTodo(todos, todo.id))}>
//                                                 <img src="/images/Done.png" alt="Done" />
//                                             </div>
//                                     }
//                                 </div>
//                                 <div className="">
//                                     <p className={`max-w-[602px] text-sm text-left ${!todo.completed ? "no-underline text-[#f2f2f2]" : "line-through text-[#808080]"}`}>{todo.text}</p>
//                                     {/* <input type="text" name="text" id="text" value={todo.text} /> */}
//                                 </div>
//                             </div>
//                             <div className="cursor-pointer" onClick={() => todosSet(removeTodo(todos, todo.id))}>
//                                 <img src="/images/trash.png" alt="Trash" />
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             }
//         </>
//     )
// }

function TodoList({ todos, todosSet }: ITodoListProps) {

    const doneTasks = useMemo(() => {
        return todos.filter((todo) => todo.completed === true)
    }, [todos]);
    
    return (
        <div className="w-full">
            <div className="flex justify-between mb-6">
                <div className="flex flex-row gap-2">
                    <span className="text-sm font-bold leading-[auto] text-[#4ea8de]">Created tasks</span>
                    <div className="w-6 min-h-[18px] flex justify-center items-center rounded-full bg-[#333333]">
                        <span className="text-xs font-bold text-[#d9d9d9]">{todos.length || 0}</span>
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <span className="text-sm font-bold leading-[auto] text-[#8284fa]">Completed tasks</span>
                    {
                        todos.length === 0 ? <div className="w-6 min-h-[18px] flex justify-center items-center rounded-full bg-[#333333]">
                            <span className="text-xs font-bold text-[#d9d9d9]">0</span>
                        </div> : <div className="min-h-[18px] flex justify-center items-center rounded-full bg-[#333333] px-2 py-[2px]">
                            <span className="text-xs font-bold text-[#d9d9d9]">{doneTasks.length} de {todos.length}</span>
                        </div>
                    }
                </div>
            </div>
            {
                todos.length === 0 ? <div className="w-full py-16 px-6 rounded-lg border-t border-solid border-[#808080]">
                    <div className="w-full flex justify-center mb-4">
                        <img src="/images/Clipboard.png" alt="Clipboard" />
                    </div>
                    <p className="leading-[140%] text-base text-[#808080] text-center">You don't have any registered tasks yet. <br /> Create tasks and organize your to-do items.</p>
                </div> : <div className="w-full rounded-lg">
                    {
                        todos.map((todo) => (
                            <TodoItem key={todo.id} {...todo} todos={todos} todosSet={todosSet}/>
                        ))
                    }
                    {/* <TodoListItems todos={todos} todosSet={todosSet} /> */}
                </div>
            }
        </div>
    )
}

export default TodoList;