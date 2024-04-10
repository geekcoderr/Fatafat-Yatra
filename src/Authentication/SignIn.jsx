// Signin.jsx
import React,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/App.css'; // Import CSS for styling
import signinasset from '../assets/images/notloggedin.png';

const Signin = () => {
  const navigate = useNavigate(); // Importing useNavigate hook

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to register page
  };

  const storeSession=()=>{
    localStorage.setItem('isAuthenticated',true);
    navigate('/');
  }

  const signInComponent = () => {
    return (
      <div className="flex justify-center items-center h-screen" >
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg" id="book">
          <h2 className="text-3xl font-semibold text-center mb-6">
            <img src={signinasset} className="w-10 inline mr-1" alt="bus" />
            {' '}
            Sign In</h2>
          <form className="space-y-4" onSubmit={storeSession}>
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{' '}
          </p>
          <div className="text-center mt-2">
            <button
              onClick={handleRegisterClick}
              id="registerButton"
            >
              Register Here!
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {signInComponent()}
    </>
  );
};

export default Signin;
