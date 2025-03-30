import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //for registering user bhaii
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { name, email, password };

    try {
      const response = await registerUser(formData);
      console.log(response);
      if (response?.success === true) {
        console.log("Registration successful:", response);
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fade-in">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            value={name}
            setValue={setName}
            Icon={User}
          />
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
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 font-semibold hover:bg-green-600 transition-all"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
