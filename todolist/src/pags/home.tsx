import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Http200 from "../Https/Http200.tsx";
import Http500 from "../Https/Http500.tsx";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [dangerMessage, setDangerMessage] = useState<string>("");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await axios.get<Task[]>("http://localhost:4000/todolist");
            setTasks(response.data);
            setLoading(false);

            if (response.status === 200) {
                setSuccessMessage(response.statusText);
            }
        } catch (error) {
            setError("Error the to charge tasks: " + error);
            setLoading(false);
        }
    };

    const deleteTask = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await axios.delete(`http://localhost:4000/todolist/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
            setSuccessMessage("Task successfully deleted!");
        } catch (error) {
            setError("Error deleting the task: " + error);
        }
    };

    const alterTaskStatus = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:4000/todolist/changeStatusTaskAsync/${id}`);

            setSuccessMessage("Task status updated!");
            loadTasks();
        } catch (error) {
            setError("Error changing task status: " + error);
        }
    };

    if (loading) {
        return (
            <div className="waitResponse mx-auto w-25 text-center p-5 border border-2 rounded-2">
                <h2>loading....</h2>
            </div>
        );
    }

    try {
        if (tasks.length === 0) {
            return (
                <div className="waitResponse mx-auto w-25 text-center p-5 border border-2 rounded-2">
                    <h2>NO TASKS</h2>
                </div>
            );
        } 
    } catch (e) {
        console.error(e);
    }  

    if (error) {
        console.error(error);
        alert('error try again later')
    }

    return (
        <main className="container-fluid">
            {successMessage && <Http200 message={successMessage} />}
            {dangerMessage && <Http500 message={dangerMessage} />}
            <div className="w-length text-center mx-auto">
                {tasks.map(t => (
                    <div key={t.id} className="row text-center border border-1 rounded-1 mb-1 p-2">
                        <div className="col-3 mt-1">
                            <p>{t.title}</p>
                        </div>
                        <div className="col-5 mt-1">
                            <p>{t.description}</p>
                        </div>
                        <div className="col-1 mt-1">
                            <p>{t.completed ? "True" : "False"}</p>
                        </div>
                        <div className="col-3">
                            <Link className="btn btn-default btn-sm btn-update" to={`/update/${t.id}`}>EDIT</Link>
                            <button className="btn btn-default btn-sm btn-change" onClick={() => alterTaskStatus(t.id)}>ALTER</button>
                            <button className="btn btn-default btn-sm btn-delete" onClick={() => deleteTask(t.id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Home;