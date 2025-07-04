import { useState } from "react";
import Header from "../Components/Header.component.jsx";
import { AddTask } from "../Utils/Localstorage.jsx";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(""); 

  const handleCreateTask = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert("Please fill in all the fields");
      return;
    }

    const newTask = {
      id: new Date().toISOString(),
      title,
      description,
      priority,
      dueDate,
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    AddTask(newTask);

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");

    console.log("New Task Added:", newTask);
  };


  return (
    <div>
      <Header />

      <div className="ml-[18vw] mt-10 mr-10 p-10 border-2 border-zinc-100 rounded-lg">
        <p className="text-2xl font-semibold mb-6">Create Task</p>

        <form className="flex flex-col gap-8" onSubmit={handleCreateTask}>
          <div className="flex flex-col gap-3">
            <label className="font-medium mb-1">Task Title</label>
            <input
              type="text"
              name="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="border border-gray-300 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task"
              className="border border-gray-300 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-5 my-5 items-center">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border border-gray-300 p-2 rounded-md outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border border-gray-300 p-2 rounded-md outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
