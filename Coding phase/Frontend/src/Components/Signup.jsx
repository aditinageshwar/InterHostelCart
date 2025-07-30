import React, { useState } from "react";
import {FaEnvelope, FaLock, FaUser, FaPhone, FaBuilding, FaCalendarAlt, FaBook} from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import img from "../assets/login.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    emailid: "",
    hostelno: "",
    roomno: "",
    username: "",
    userdob: "",
    userphoneno: "",
    userpassword: "",
    userdept: "",
    usercourse: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formattedData = {
        ...formData,
        userdob: formatDate(formData.userdob)
      };

      const response = await axios.post("http://localhost:3001/api/auth/signup", formattedData);
      const { token } = response.data;

      Cookies.set("token", token, { expires: 1 });
      navigate("/");
    } 
    catch (err) {
      const message = err.response?.data?.message || err.response?.data?.sqlMessage;

      if (message?.includes("Duplicate entry") && message.includes("emailid")) {
        setError("This email is already registered. Try logging in instead.");
      } else {
        setError("Signup failed: " + (message || "Unknown error"));
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#F8F4E1] to-[#E8DFC7] min-h-screen">
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-10">
              <h2 className="text-4xl font-bold text-[#543310] mb-8">Create Account</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { icon: FaEnvelope, name: "emailid", type: "email", placeholder: "Email" },
                  { icon: FaBuilding, name: "hostelno", type: "text", placeholder: "Hostel Number" },
                  { icon: FaBuilding, name: "roomno", type: "text", placeholder: "Room Number" },
                  { icon: FaUser, name: "username", type: "text", placeholder: "Username" },
                  { icon: FaCalendarAlt, name: "userdob", type: "date", placeholder: "Date of Birth" },
                  { icon: FaPhone, name: "userphoneno", type: "text", placeholder: "Phone Number" },
                  { icon: FaLock, name: "userpassword", type: "password", placeholder: "Password" },
                  { icon: FaBook, name: "userdept", type: "text", placeholder: "Department" },
                  { icon: FaBook, name: "usercourse", type: "text", placeholder: "Course" }
                ].map(({ icon: Icon, name, type, placeholder }) => (
                  <div className="relative" key={name}>
                    <Icon className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      onChange={handleChange}
                      value={formData[name]}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a78059] transition duration-300"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#74512D] text-white rounded-lg py-3 font-semibold transition duration-300 transform ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#543310] hover:scale-105"
                  }`}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?
                  <Link to="/login" className="ml-2 text-[#a78059] hover:underline font-semibold">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2">
              <img src={img} alt="signup" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;