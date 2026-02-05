import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../components/common/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.jsx";
import { API_ENDPOINTS } from "../utils/api.js";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

    } catch (err) {
      localStorage.clear();
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <BookOpen className="w-10 h-10 text-violet-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Log in to your account to continue writing with Pagyn.
          </p>
        </div>

        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-violet-600 hover:text-violet-700 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
