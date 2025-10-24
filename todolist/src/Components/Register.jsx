import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase"; // path to your firebase.js file

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://todolist-backend-0gwj.onrender.com/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration Successful!");
      navigate("/"); // Go back to login
    } catch (error) {
      // .response?.data?
      alert(error.message || "Registration Failed");
      console.error("Registration failed", error);
    }
  };

  useEffect(() => {
    console.log("Register clicked");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-3 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Register
          </button>
          <p className="text-sm mt-2 text-center">
            Already have an account?
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline ml-1 cursor-pointer"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
