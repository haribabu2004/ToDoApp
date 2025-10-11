import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase"; // adjust path if needed

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      console.log(response.data.message);
      // console.log(response.data.token);
      // alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.log("login failed:\n" + error.response.message);
      // alert(
      //   "Login failed: " + (error.response?.data?.message || "Unknown error")
      // );
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Firebase login success:", userCredential.user);
        alert("Login successful");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Firebase login error:", error);
        alert("Login failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <button
          type="button"
          onClick={() => {
            signInWithPopup(auth, provider)
              .then((result) => {
                const user = result.user;
                console.log("Google login success:", user);
                alert("Login successful via Google!");
                navigate("/home");
              })
              .catch((error) => {
                console.error("Google login failed:", error);
                alert("Google login failed");
              });
          }}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-4"
        >
          Sign in with Google
        </button>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="text-sm mt-2">
            Don’t have an account?
            <button
              type="button"
              onClick={() =>
                // {
                // console.log("Inside resgister");
                navigate("/register")
              }
              className="text-blue-600 hover:underline ml-1"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
