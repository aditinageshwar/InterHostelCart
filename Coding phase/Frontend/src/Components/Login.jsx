import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';
import img from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { socket } from './Socket';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formattedData = {
        emailid: formData.email.trim(),
        userpassword: formData.password.trim()
      };

      const response = await axios.post("http://localhost:3001/api/auth/login", formattedData);
      const { token, admin } = response.data;

      Cookies.set("token", token, { expires: 1 }); 
      
      const decoded = jwtDecode(token);
      socket.emit('registerUser', decoded.userId); 

      navigate(admin ? "/admin" : "/");
    } 
    catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-100 rounded-lg shadow-lg shadow-gray-500/70">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mt-20 mb-40">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-10">
              <h2 className="text-4xl font-bold bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent mb-8">
                Welcome Back
              </h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-700 transition duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-600 hover:via-cyan-500 hover:to-teal-500 shadow-lg
                            text-white rounded-lg py-3 font-semibold transition duration-300 transform ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#543310] hover:scale-105"
                  }`}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                  <Link to="/signup" className="ml-2 text-cyan-500 hover:underline focus:outline-none font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2">
              <img src={img} alt="login" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;