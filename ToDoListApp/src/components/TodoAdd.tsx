import { useState } from "react";
import { ITodo } from "../types/todo";
import { addTodo } from "../store";

type ITodoAddProps = {
    todos:ITodo[];
    todosSet: React.Dispatch<React.SetStateAction<ITodo[]>>
}

function TodoAdd({ todosSet,todos }: ITodoAddProps) {
    const [newTodo, setNewTodo] = useState<string>("");
    return (
        <div className="w-full flex flex-row gap-2">
            <input type="text" name="todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="w-full text-[#f2f2f2] px-4 outline-none bg-[#262626] placeholder:text-[#808080] py-4 rounded-lg" id="todo" placeholder="Added new todo" />
            <button type="submit" onClick={() => {
                todosSet(addTodo(todos,newTodo));
                setNewTodo("");
            }} className="rounded-lg bg-[#1e6f9f] text-[#f2f2f2] px-4 py-4 outline-none focus:outline-none focus-visible:outline-none">
                <span className="text-sm leading-[140%] font-bold">Add</span>
            </button>
        </div>
    )
}

export default TodoAdd;