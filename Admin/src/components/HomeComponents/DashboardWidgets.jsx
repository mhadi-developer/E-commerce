import React, { useState } from "react";

// Sample data for Messages
const messagesData = [
  {
    id: 1,
    name: "Jhon Doe",
    time: "15 minutes ago",
    message: "Short message goes here...",
    img: "assest/img/user.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    time: "30 minutes ago",
    message: "Another short message...",
    img: "assest/img/user.jpg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    time: "1 hour ago",
    message: "Yet another message...",
    img: "assest/img/user.jpg",
  },
  {
    id: 4,
    name: "Bob Brown",
    time: "2 hours ago",
    message: "Message content here...",
    img: "assest/img/user.jpg",
  },
];

// Sample data for To-Do list
const initialTasks = [
  { id: 1, text: "Short task goes here...", completed: false },
  { id: 2, text: "Another task goes here...", completed: false },
  { id: 3, text: "Completed task example", completed: true },
  { id: 4, text: "Yet another task...", completed: false },
  { id: 5, text: "Final task example", completed: false },
];

const DashboardWidgets = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        {/* Messages Widget */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0">Messages</h6>
              <a href="#">Show All</a>
            </div>
            {messagesData.map((msg) => (
              <div
                key={msg.id}
                className={`d-flex align-items-center ${
                  msg.id !== messagesData.length ? "border-bottom" : "pt-3"
                } py-3`}
              >
                <img
                  className="rounded-circle flex-shrink-0"
                  src={msg.img}
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">{msg.name}</h6>
                    <small>{msg.time}</small>
                  </div>
                  <span>{msg.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* To-Do List Widget */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">To Do List</h6>
              <a href="#">Show All</a>
            </div>
            <div className="d-flex mb-2">
              <input
                className="form-control bg-dark border-0"
                type="text"
                placeholder="Enter task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={addTask}
              >
                Add
              </button>
            </div>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="d-flex align-items-center border-bottom py-2"
              >
                <input
                  className="form-check-input m-0"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span>
                      {task.completed ? <del>{task.text}</del> : task.text}
                    </span>
                    <button
                      className={`btn btn-sm ${
                        task.completed ? "text-primary" : ""
                      }`}
                      onClick={() => removeTask(task.id)}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
