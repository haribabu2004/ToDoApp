import React from "react";

function Login(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
                    Login</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:</label>
                        <input type="email" name="email" 
                         className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:</label>
                        <input type="password" 
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required 
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;