import React, { useState } from "react";
import '../styles/CreateTask.css';
import Task from "../DTOs/task";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    const [task, setTask] = useState<Task>({ title: "", description: "" });
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:4000/todolist`, task);
            
            if (response.status === 201) {
                setMessage("Task created with success!");
                setTask({ title: "", description: "" });

                setTimeout(() => setMessage(""), 5000);
            }

        } catch (error) {
            setMessage("Error the create task.");
            console.error(error);
        }
    };

    return (
        <div className="w-length-form border border-1 rounded-2 mx-auto mt-length">
            {message && <div className="alert alert-warning text-center">{message}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row p-3">
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={task.title}
                                max={100}
                                onChange={(e) => setTask(prev => ({ ...prev, title: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                required
                                rows={3}
                                value={task.description}
                                onChange={(e) => setTask(prev => ({ ...prev, description: e.target.value }))}
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-default">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;