import React from "react";

const Login = ({ isDarkMode }) => {
  return (
    <div
      className={`h-screen w-screen bg-cover bg-center flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
      style={{
        backgroundImage: `url('https://source.unsplash.com/random/1920x1080')`, // Replace with your dummy image URL
      }}
    >
      <div
        className={`p-8 rounded-lg shadow-lg max-w-md w-full ${
          isDarkMode ? "bg-gray-800 bg-opacity-90" : "bg-white"
        }`}
      >
        <h1
          className={`text-2xl font-semibold text-center mb-6 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Sign in to your account
        </h1>
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              className={`mt-1 block w-full px-3 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={`mt-1 block w-full px-3 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
          </div>
          {/* Options */}
          <div className="flex items-center justify-between">
            <label
              className={`flex items-center text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <input
                type="checkbox"
                className={`mr-2 rounded ${
                  isDarkMode
                    ? "border-gray-600 text-blue-500 focus:ring-blue-500"
                    : "border-gray-300 text-blue-500 focus:ring-blue-500"
                }`}
              />
              Remember me
            </label>
            <a
              href="#"
              className={`text-sm ${
                isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
              }`}
            >
              Forgot password?
            </a>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md shadow ${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300"
                : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300"
            } focus:outline-none`}
          >
            Log in to your account
          </button>
        </form>
        {/* Sign-Up Option */}
        <p
          className={`text-sm text-center mt-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Don’t have an account?{" "}
          <a
            href="#"
            className={`${
              isDarkMode ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"
            }`}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
