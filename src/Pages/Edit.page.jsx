import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header.component";
import { getTasks, UpdateAllTasks } from "../Utils/Localstorage";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const tasks = getTasks();
        const selectedTask = tasks.find((t) => t.id === id);
        if (selectedTask) {
            setTask(selectedTask);
        } else {
            navigate("/manageTasks");
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const tasks = getTasks();
        const updated = tasks.map((t) => (t.id === task.id ? task : t));
        UpdateAllTasks(updated);
        navigate("/manageTasks");
    };

    const confirmDelete = () => {
        const tasks = getTasks();
        const filtered = tasks.filter((t) => t.id !== task.id);
        UpdateAllTasks(filtered);
        navigate("/manageTasks");
    };

    if (!task) return null;

    return (
        <div>
            <Header />

            <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Task</h2>

                <div className="space-y-5">
                    <div>
                        <label className="block font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Priority</label>
                        <select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={task.dueDate}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>

                    <button
                        onClick={() => setShowConfirm(true)}
                        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
                    >
                        Delete Task
                    </button>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 bg-white/80 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-6 text-sm text-gray-700">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditPage;
