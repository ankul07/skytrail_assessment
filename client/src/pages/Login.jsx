import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginUser } from "../services/api";

const InputField = ({ label, type, value, setValue, Icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-gray-700 font-semibold">{label}</label>
      <div className="flex items-center border rounded-lg px-3 py-2 shadow-md transition-all focus-within:shadow-lg focus-within:ring-2 focus-within:ring-blue-500">
        <Icon className="text-gray-500" size={20} />
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          className="ml-2 flex-1 outline-none bg-transparent"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //for login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);
    const formData = { email, password };
    try {
      const response = await loginUser(formData);
      console.log(response);
      if (response?.success === true) {
        alert("Login successful!");
        window.dispatchEvent(new Event("authStateChanged"));
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fade-in">
          Login
        </h2>
        <InputField
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
          Icon={Mail}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
          Icon={Lock}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 font-semibold hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
