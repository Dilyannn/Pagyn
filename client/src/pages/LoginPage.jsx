import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
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
      const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, formData);
      login(response.data.user, response.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      localStorage.clear();
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="top-0 left-0 w-full h-full overflow-hidden pointer-events-none sticky">
        <div className="absolute -top-[10%] -left-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute top-[10%] -right-[5%] w-100 h-100 bg-purple-200 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[10%] -left-[5%] w-100 h-100 bg-indigo-100 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Link to="/" className="p-3 bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl shadow-violet-500/20 transform hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-8 h-8 text-white" />
          </Link>
        </div>
        <h1 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 text-lg">
          Log in to your account to continue writing.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 group">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

        {/* Floating Semi-Transparent Corner Elements */}
        <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100/60 rounded-2xl border border-purple-200/50 backdrop-blur-sm shadow-sm pointer-events-none z-0"></div>
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-violet-100/60 rounded-full border border-violet-200/50 backdrop-blur-sm shadow-sm pointer-events-none z-0"></div>
        
        <div className="relative z-10 rounded-3xl bg-white/70 border border-white/20 p-6 lg:p-10 backdrop-blur-xl transform perspective-1000 rotate-y-6 group-hover:rotate-y-0 transition-transform duration-700 ease-out shadow-2xl shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
              required
            />
            <div className="space-y-1">
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                required
              />
              <div className="flex justify-end">
                <Link to="/forgot-password" size="sm" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              isLoading={isLoading} 
              className="w-full py-4 text-lg"
              variant="primary"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 italic">
            <p className="text-center text-sm text-gray-600">
              New to Pagyn?{" "}
              <Link to="/register" className="text-violet-600 hover:text-violet-700 font-bold decoration-2 underline-offset-4 transition-all">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
