import React, { useEffect, useState } from "react";
import '../styles/CreateTask.css';
import { useNavigate, useParams } from "react-router-dom";
import Http400 from "../Https/Http400.tsx";
import axios from "axios";

interface Task {
    title: string;
    description: string;
}

const UpdateTask = () => {
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [warning, setWarning] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const taskId = Number(id);

        if (!id || isNaN(taskId)) {
            setWarning("ID is required");
            setTimeout(() => navigate('/'), 3000);
            return;
        }

        axios.get<Task>(`http://localhost:4000/todolist/${taskId}`)
            .then(response => {
                if (!response.data) {
                    alert('Task not found');
                    navigate('/');
                    return;
                }

                setTask(response.data);
                setLoading(false);

                if (response.status === 400) {
                    setWarning(response.statusText);  
                }

            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                setTimeout(() => navigate('/'), 3000);
            });
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!task) return;
    
        try {
            const updatedTask = {
                title: task.title,
                description: task.description
            };
    
            const response = await axios.put(`http://localhost:4000/todolist/update/${id}`, updatedTask, {
                headers: { "Content-Type": "application/json" }
            });
    
            alert("Task updated!!");
            navigate("/");
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || "Error the updated task.");
                setWarning(err.response.data.message);
            } else {
                setError("Unexpected error. Please try again.");
            }
        }
    };
    

    if (loading) {
        return (
            <div className="waitResponse mx-auto w-25 text-center p-5 border border-2 rounded-2">
                <h2>loading....</h2>
            </div>
        );
    }

    return (
        <div className="w-length-form border border-1 rounded-2 mx-auto mt-length">
            {warning && <Http400 message={warning} />}
            <form onSubmit={handleSubmit}>
                <div className="row p-3">
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={task?.title || ""}
                                onChange={(e) => setTask({ ...task!, title: e.target.value })}
                                required
                                max={100}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                value={task?.description || ""}
                                onChange={(e) => setTask({ ...task!, description: e.target.value })}
                                required
                                rows={3}
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">
                            Atualizar Tarefa
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;