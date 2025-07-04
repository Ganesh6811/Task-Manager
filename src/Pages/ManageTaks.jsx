import { useEffect, useState } from "react";
import Header from "../Components/Header.component";
import { getTasks, UpdateAllTasks } from "../Utils/Localstorage";
import { useNavigate } from "react-router-dom";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [displayTasks, setDisplayTasks] = useState([]);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const toggleStatus = (id) => {
    const updatedAllTasks = allTasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" }
        : task
    );
    const updatedPending = updatedAllTasks.filter((task) => task.status === "Pending");
    const updatedCompleted = updatedAllTasks.filter((task) => task.status === "Completed");

    setAllTasks(updatedAllTasks);
    setPendingTasks(updatedPending);
    setCompletedTasks(updatedCompleted);
    UpdateAllTasks(updatedAllTasks);

    if (category === "All") setDisplayTasks(updatedAllTasks);
    else if (category === "Pending") setDisplayTasks(updatedPending);
    else setDisplayTasks(updatedCompleted);
  };

  const updateTask = (id) => {
    navigate(`/edit/${id}`);
  };

  const updateCategory = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === "All") setDisplayTasks(allTasks);
    else if (newCategory === "Pending") setDisplayTasks(pendingTasks);
    else setDisplayTasks(completedTasks);
  };

  const isCategory = (value) => value === category;

  useEffect(() => { 
    const tasks = getTasks() || [];
    const pending = tasks.filter((task) => task.status === "Pending");
    const completed = tasks.filter((task) => task.status === "Completed");

    setAllTasks(tasks);
    setPendingTasks(pending);
    setCompletedTasks(completed);
    setDisplayTasks(tasks);
  }, []);

  return (
    <div>
      <Header />
      <div className="ml-[10vw] md:ml-[13vw] sm:ml-0">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <p className="text-xl font-bold">My Tasks</p>
          <div className="flex flex-wrap gap-4">
            {["All", "Pending", "Completed"].map((cat) => (
              <div
                key={cat}
                className={`hover:cursor-pointer flex items-center gap-2 px-4 py-1 rounded-full transition ${
                  isCategory(cat)
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => updateCategory(cat)}
              >
                <span>{cat}</span>
                <span className="bg-gray-400 text-white text-xs px-2 py-[2px] rounded-full min-w-[22px] text-center">
                  {cat === "All"
                    ? allTasks.length
                    : cat === "Pending"
                    ? pendingTasks.length
                    : completedTasks.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 pb-10">
          {displayTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between gap-4 border hover:cursor-pointer"
              onClick={() => updateTask(task.id)}
            >
              <div className="flex gap-2 text-xs font-semibold flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    task.status === "Pending"
                      ? "bg-purple-500"
                      : task.status === "In Progress"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                >
                  {task.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    task.priority === "HIGH"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">{task.description}</p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <div>
                  <p className="font-medium">Start Date:</p>
                  <p className="text-black font-bold">{task.createdAt}</p>
                </div>
                <div>
                  <p className="font-medium">Due Date:</p>
                  <p className="text-black font-bold">{task.dueDate}</p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatus(task.id);
                  }}
                  className="text-sm px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition w-full"
                >
                  Mark as {task.status === "Pending" ? "Completed" : "Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
