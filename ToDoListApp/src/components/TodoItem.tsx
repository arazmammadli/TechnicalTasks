import { useState } from "react"
import { removeTodo, toggleTodo, updateTodo } from "../store";
import { ITodo } from "../types/todo";

type ITodoItemProps = {
    id: string;
    text: string;
    completed: boolean;
    todos: ITodo[];
    todosSet: React.Dispatch<React.SetStateAction<ITodo[]>>
}

function TodoItem({ id, completed, text, todos, todosSet }: ITodoItemProps) {
    const [isUpdate, setIsUpdate] = useState<boolean>();
    const [updateText, setUpdateText] = useState<string>(text);

    return (
        <div className="bg-[#262626] rounded-lg py-4 px-4 relative mb-4 last:mb-0">
            <div className="flex flex-row justify-between">
                {
                    !isUpdate ? <div className="flex flex-row gap-3 items-start">
                        <div className="min-w-[24px] min-h-[24px] relative top-[4px]">
                            {
                                !completed ? <div onClick={() => todosSet(toggleTodo(todos, id))} className="w-4 h-4 cursor-pointer mx-auto border-2 border-solid border-[#4ea8de] rounded-[50%]"></div>
                                    : <div className="cursor-pointer" onClick={() => todosSet(toggleTodo(todos, id))}>
                                        <img src="/images/Done.png" alt="Done" />
                                    </div>
                            }
                        </div>
                        <div className="">
                            <p className={`max-w-[602px] text-sm text-left ${!completed ? "no-underline text-[#f2f2f2]" : "line-through text-[#808080]"}`}>{text}</p>
                        </div>
                    </div> : <div className="flex flex-row w-full gap-2">
                        <textarea name="text" id="text" onChange={(e) => setUpdateText(e.target.value)} value={updateText} className="overflow-hidden w-full outline-none max-h-[60px] resize-none bg-[#333] px-2 py-2"></textarea>
                        <div className="flex flex-row gap-2">
                            <button type="button" className="border-[#4EA8DE] text-[#4EA8DE]" onClick={() => {
                                todosSet(updateTodo(todos, updateText, id));
                                setIsUpdate(false);
                            }}>Update</button>
                            <button type="button" className="text-[#f2f2f2]" onClick={() => setIsUpdate(false)}>Cancel</button>
                        </div>
                    </div>
                }
                {
                    !isUpdate ? <div className="flex flex-row gap-2 items-start">
                        <div className="cursor-pointer" onClick={() => todosSet(removeTodo(todos, id))}>
                            <img src="/images/bin.png" alt="Trash" />
                        </div>
                        <div className="cursor-pointer" onClick={() => setIsUpdate(prevState => !prevState)}>
                            <img src="/images/edit.png" alt="Edit" />
                        </div>
                    </div> : null
                }
            </div>
        </div>
    )
}

export default TodoItem;