import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
    const [username, setUserInput] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim()) {
            localStorage.setItem('Username', username);
            navigate("/");
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100">
            <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Welcome to Task Manager</h2>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />

                <button
                    onClick={handleLogin}
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
