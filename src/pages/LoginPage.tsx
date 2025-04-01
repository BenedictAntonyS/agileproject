import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn, UserPlus, Users, ShieldCheck } from "lucide-react";
import { useUser, useUser1 } from "../context/UserContext";

type AuthMode = "login" | "register";

const LoginPage: React.FC = () => {
  const { isAuthenticated, userType, login, setUserType } = useUser();
  const { username } = useUser1();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={userType === "admin" ? "/admin" : "/user"} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (authMode === "login") {
        const response = await axios.post("http://localhost:5013/api/login", {
          email: formData.email,
          password: formData.password,
          userType:userType
        });

        if (response.status === 200) {
          const userData = response.data.user;

          login(userData);
          navigate(userData.userType === "admin" ? "/admin" : "/user");
        }
      } else {
        // Registration
        const response = await axios.post(
          "http://localhost:5013/api/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.status === 201) {
          alert("Registration Successful! Please log in.");
          setAuthMode("login");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - Hero Section */}
        <div className="md:w-1/2 bg-indigo-600 p-8 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Campus Connector</h1>
          <p className="text-lg mb-6">
            Connect, Network, and Participate in Campus Events
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-3" />
              <span>Connect with fellow students</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="w-6 h-6 mr-3" />
              <span>Secure event management</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="md:w-1/2 p-8">
          {/* User Type Toggle */}
          {authMode === "login" && (
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                <button
                  className={`px-4 py-2 rounded-md ${
                    userType === "user"
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setUserType("user")}
                >
                  User
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    userType === "admin"
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setUserType("admin")}
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-center mb-6">
            {authMode === "login"
              ? userType === "admin"
                ? "Admin Login"
                : "User Login"
              : "Create Account"}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                "Processing..."
              ) : authMode === "login" ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Register</span>
                </>
              )}
            </button>

            {userType === "user" && (
              <p className="text-center text-sm text-gray-600">
                {authMode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "register" : "login")
                  }
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  {authMode === "login" ? "Register here" : "Login here"}
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
