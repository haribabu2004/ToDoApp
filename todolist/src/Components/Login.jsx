import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response =await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      console.log(response.data.message);

      const userId = response.data.userId || response.data.user?._id;
      if(userId){
        localStorage.setItem("userId",userId);
        // localStorage.setItem("token",res.data.token)
        console.log("Stored userId:",response.data.userId);
        navigate("/home");
      }else{
        alert("Login successful, but userId missing from server response");
      }

      // navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message);
      console.log(
        "login failed:\n" + (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
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
              required
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
          <p className="text-sm mt-2">
            Don’t have an account?
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline ml-1 cursor-pointer"
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
