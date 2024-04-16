import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/App.css'; // Import CSS for styling
import signinasset from '../assets/images/notloggedin.png';
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate(); // Importing useNavigate hook

  const username = useRef(null);
  const password = useRef(null);
  const [message, setMessage] = useState('');

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to register page
  };

  const storeSession = (e) => {
    e.preventDefault();
    const credentials = {
      username: username.current.value,
      password: password.current.value,
    }
    axios.post('http://localhost:3001/login', credentials)
      .then(response => {
        if (response.data.message === 'authenticated') {
          setMessage('You are Authenticated!');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('currentUserId',response.data.id);
          navigate('/home');
        } else if (response.data.message === 'unauthenticated') {
          setMessage('Credentials are not Valid!');
        }
      })
      .catch(error => {
        setMessage('Error: Might be Internal Server Error');
        console.error('Error:', error);
      });
  }

  const signInComponent = () => {
    return (
      <div className="flex justify-center items-center h-screen" style={{backdropFilter: 'blur(10px)'}} >
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg" id="book">
          <h2 className="text-3xl font-semibold text-center mb-6">
            <img src={signinasset} className="w-10 inline mr-1" alt="bus" />
            {' '}
            Sign In</h2>
          {message && (
            <p className="text-red-500 text-center mb-4">{message}</p>
          )}
          <form className="space-y-4" onSubmit={storeSession}>
            <input
              ref={username}
              type="text"
              placeholder="Username"
              required
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
