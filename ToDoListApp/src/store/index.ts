import { ITodo } from "../types/todo";
import {v4 as uuidv4} from "uuid";

export function addTodo(todos: ITodo[], text: string) {
    return [
        ...todos,
        {
            id: uuidv4(),
            text,
            completed: false
        }
    ]
}

export function removeTodo(todos: ITodo[], id: string) {
    return todos.filter((todo) => todo.id !== id)
}

export function updateTodo(todos: ITodo[], text: string, id: string) {
    return todos.map((todo) => ({
        ...todo,
        text: todo.id === id ? text : todo.text
    }))
}

export function toggleTodo(todos: ITodo[], id: string) {
    return todos.map((todo) => ({
        ...todo,
        completed: todo.id === id ? !todo.completed : todo.completed
    }))
}