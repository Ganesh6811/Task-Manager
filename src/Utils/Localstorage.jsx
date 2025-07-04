
export const getUsername = ()=>{
    return localStorage.getItem('UserName');
}

export const getTasks = ()=>{
    return JSON.parse(localStorage.getItem('tasks')) || []; 
}

export const AddTask = (newTask)=>{
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
}

export const UpdateAllTasks = (tasks)=>{ 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("updated");
}