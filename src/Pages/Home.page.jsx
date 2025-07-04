import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.component";
import { getTasks } from "../Utils/Localstorage";

const DashboardPage = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const allTasks = getTasks();
        setTasks(allTasks || []);
    }, []);

    const total = tasks.length;
    const completed = tasks.filter(task => task.status === "Completed").length;
    const pending = total - completed;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="max-w-5xl mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded shadow text-center">
                        <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
                        <p className="text-2xl font-bold">{total}</p>
                    </div>
                    <div className="bg-green-100 p-6 rounded shadow text-center">
                        <h2 className="text-xl font-semibold mb-2">Completed</h2>
                        <p className="text-2xl font-bold text-green-700">{completed}</p>
                    </div>
                    <div className="bg-yellow-100 p-6 rounded shadow text-center">
                        <h2 className="text-xl font-semibold mb-2">Pending</h2>
                        <p className="text-2xl font-bold text-yellow-700">{pending}</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => navigate("/manageTasks")}
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                    >
                        Manage Tasks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
