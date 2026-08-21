import React, { useState, useEffect } from "react";
import Create from "./Create.jsx";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { BsCircleFill, BsFillTrashFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

function Home() {
  const [todo, setTodo] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const navigate = useNavigate();

  const handleAdd = (task) => {
    console.log(task);
    setTodo([...todo, task]);
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTask(item.task);
  };

  // Save editted task
  const handleEditSave = (id) => {
    axios
      .put(`http://localhost:3001/update/edit/${id}`, { task: editTask })
      .then((res) => {
        console.log(res);

        const UpdateList = todo.map((item) =>
          item._id === id ? { ...item, task: editTask } : item
        );

        setTodo(UpdateList);
        setEditId(null);
        setEditTask("");
      })
      .catch((err) => console.log(err));
  };

  // delete a  task
  const handleDelete = (id) => {
    console.log(id);
    axios.delete("http://localhost:3001/delete/" + id).then((result) => {
      console.log(result.data);
      setTodo(todo.filter((item) => item._id !== id));
    });
  };

  // mark as completed
  const handleComplete = (id) => {
    const item = todo.find((t) => t._id === id);
    const updatedCompleted = !item.completed;

    axios
      .put(`http://localhost:3001/update/${id}`, {
        completed: updatedCompleted,
      })
      .then((res) => {
        const updatedTodo = todo.map((t) =>
          t._id === id ? { ...t, completed: updatedCompleted } : t
        );
        console.log(updatedTodo);
        setTodo(updatedTodo);
      })
      .catch((err) => {
        console.error("Error updating completed status", err);
      });
  };

  // logout application
  const handleLogout = () => {
    //remove localstorage token
    localStorage.removeItem("token");
    
    alert("Logged out Successfully");
    navigate("/");
  };

  //load the tasks (TODOS)
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if(!userId){
      console.log("No userId found - user not logged in");
      return;
    }
 
    axios
      .get("http://localhost:3001/get/"+userId)
      .then((res) => {
        // console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => console.log("Fetch Failed: "+err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-stone-950 relative">
      {/* Logout button top-right */}
      <div className="absolute top-4 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center pt-6">
        <div className="flex items-center flex-col w-3/4 bg-gray-200 p-5 rounded-lg shadow-lg">
          <h2 className="my-5 text-3xl bg-black text-white p-2 rounded-sm">
            Todo List
          </h2>
          <Create handleAdd={handleAdd} />
        </div>

        <div className="flex w-3/4 bg-gray-200 p-3 rounded-lg shadow-lg mt-5">
          {todo.length === 0 ? (
            <div className="flex items-center justify-center w-full">
              <h2 className="text-gray-600">No tasks yet.</h2>
            </div>
          ) : (
            <div className="flex flex-col gap-3 w-full">
              {todo.map((item) => (
                <div
                  key={item._id}
                  className="w-full bg-white p-3 rounded-lg shadow-md flex justify-between items-center"
                >
                  <BsCircleFill
                    onClick={() => handleComplete(item._id)}
                    className={`cursor-pointer text-xl transition ${
                      item.completed ? "text-green-600" : "text-gray-400 hover:text-green-600"
                    }`}
                  />
                  {editId === item._id ? (
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      onBlur={() => handleEditSave(item._id)}
                      onKeyDown={(e) => e.key === "Enter" && handleEditSave(item._id)}
                      className="border-b-2 border-gray-400 focus:outline-none px-2 w-full mx-3"
                    />
                  ) : (
                    <span
                      className={`flex-1 mx-3 ${
                        item.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.task}
                    </span>
                  )}
                  <MdEdit
                    className="cursor-pointer hover:text-blue-600 mx-2"
                    onClick={() => handleEdit(item)}
                  />
                  <BsFillTrashFill
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
