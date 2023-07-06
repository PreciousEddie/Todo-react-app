import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button, ListGroup, ListGroupItem } from "reactstrap";
import "./Todo.css"

const Todo = ({ id, todo, removeTodo, updateTodo }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo);
    const [completed, setCompleted] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const handleRemoveTodo = () => {
        setIsDeleted(true);
    };
    useEffect(() => {
        if (isDeleted) {
            const timer = setTimeout(() => {
                removeTodo(id);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isDeleted, id, removeTodo]);
    const handleEditTodo = () => {
        setEditMode(true);
    };
    const handleChange = (e) => {
        setEditedTodo(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo(id, editedTodo);
        setEditMode(false);
    };
    const handleToggleComplete = () => {
        setCompleted(!completed);
    }
    if (editMode) {
        return (
            <li>
                <form onSubmit={ handleSubmit }>
                    <input
                        type="text"
                        value={ editedTodo }
                        onChange={ handleChange }
                    />
                    <button type="submit">Save</button>
                </form>
            </li>
        );
    } else {
        return (
            <ListGroup>
                <ListGroupItem key={ id } className={ `Todo${isDeleted ? " fade-out" : ""}` }
                    style={ { textDecoration: completed ? "line-through" : "none" } }>
                    { todo }
                    <>
                        <ButtonGroup>
                            <Button color="warning" onClick={ handleEditTodo }>Edit</Button>
                            <Button color="danger" onClick={ handleRemoveTodo }>X</Button>
                            <Button color="success" onClick={ handleToggleComplete }>
                                { completed ? "Mark as Incomplete" : "Mark as Completed" }
                            </Button>
                        </ButtonGroup>
                    </>
                </ListGroupItem>
            </ListGroup>
        );
    }
};

export default Todo;