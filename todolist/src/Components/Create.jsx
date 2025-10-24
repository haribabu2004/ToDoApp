import React, { useState } from "react";
import axios from "axios";

function Create(props) {
  const [task, setTask] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleadd = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in. Please log in again.");
      return;
    }

    if (task.trim() === "") {
      alert("Please enter a task");
    } else {
      axios
        .post("http://localhost:3001/add", {
          task,
          userId,
        })
        .then((result) => {
          console.log(result.data);
          props.handleAdd(result.data);
          setTask("");
          setErrorMsg("");
        })
        .catch((err) => {
          console.error(error);
          setErrorMsg(error.response?.data || "Failed to add task");
        });
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="enter the task"
          className="border h-10 w-80 rounded-full px-4 py-2"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white rounded-full px-4 py-2 cursor-pointer"
          onClick={handleadd}
        >
          Add
        </button>
      </div>
      {errorMsg && (
        <div className="flex justify-center mt-3 text-red-600">
          <p>{errorMsg}</p>
        </div>
      )}
    </div>
  );
}

export default Create;
