import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

const TodoList = () => {
    const INITIAL_STATE = [];
    const [todos, setTodos] = useState(INITIAL_STATE);
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            try {
                const parsedTodos = JSON.parse(savedTodos);
                setTodos(parsedTodos);
            } catch (error) {
                setTodos(INITIAL_STATE);
            }
        } else {
            setTodos(INITIAL_STATE);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    const addTodo = (newTodo) => {
        setTodos(todos => [...todos, { ...newTodo, id: uuid() }]);
    };
    const removeTodo = (id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    };
    const updateTodo = (id, updateTodo) => {
        setTodos((todos) => todos.map((todo) => todo.id === id ? { ...todo, todo: updateTodo } : todo));
    };
    return (
        <>
            <div>
                <NewTodoForm addTodo={ addTodo } />
            </div>
            <div>
                { todos.map(({ id, todo }) => (
                    <Todo
                        id={ id }
                        key={ id }
                        todo={ todo }
                        removeTodo={ removeTodo }
                        updateTodo={ updateTodo }
                    />
                )) }
            </div>
        </>
    );
};

export default TodoList;