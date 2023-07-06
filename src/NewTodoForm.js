import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "reactstrap";
import "./NewTodoForm.css"


const NewTodoForm = ({ addTodo }) => {
    const INITIAL_STATE = {
        todo: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ ...formData });
        setFormData(INITIAL_STATE);
    };

    return (
        <form className="NewTodoForm" onSubmit={ handleSubmit }>
            <label htmlFor="todo">Todo:</label>
            <input
                className="NewTodoForm-input"
                id="todo"
                type="text"
                name="todo"
                placeholder="Add a Todo"
                value={ formData.todo }
                onChange={ handleChange }
            />
            <Button color="info" className="NewTodoForm-button">Add Task</Button>
        </form>
    );
};

export default NewTodoForm;