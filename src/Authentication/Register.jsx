import { Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import WebNav from "../components/navbar/WebNav";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Thanks from "../pages/Thanks";
import SignIn from './SignIn';
import registerAsset from '../assets/images/registering.png';
import '../assets/App.css';
import { useRef, useState } from "react";

const Register = () => {
    const navigate = useNavigate(); // Importing useNavigate hook

    const username = useRef(null);
    const password = useRef(null);
    const email = useRef(null);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('text-red-500'); // Default color is red

    const register = async (e) => {
        e.preventDefault();
        const credentials = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        }

        await axios.post('http://localhost:3001/register', credentials).then(response => {
            if (response.data.message === 'registered') {
                setMessage('Congratulations! You have been Successfully Registered!');
                setMessageColor('text-green-500'); // Change color to yellow
                // navigate('/sign-in');
            }
            else if (response.data.message === 'already-exist') {
                setMessage('Ahh User Already Exist, Try with another Credentials!');
                setMessageColor('text-yellow-500'); // Reset color to red
            }
        }).catch(error => {
            setMessage('Might be Internal Server Error!');
            setMessageColor('text-red-00'); // Reset color to red
        });
    };

    const handleSignInClick = () => {
        navigate('/sign-in'); // Navigate to sign-in page
    };

    const registerComponent = () => {
        return (
            <div className="flex justify-center items-center h-screen" style={{backdropFilter: 'blur(10px)'}}>
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg" id="book" >
                    <h2 className="text-3xl font-semibold text-center mb-6">
                        <img src={registerAsset} className="w-10 inline mr-1" alt="bus" />
                        {' '}
                        Register
                    </h2>
                    {message && (
                        <p className={`text-center mb-4 ${messageColor}`}>{message}</p>
                    )}
                    <form className="space-y-4" onSubmit={register}>
                        <input
                            ref={username}
                            type="text"
                            placeholder="Username"
                            required
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <input ref={email}
                            type="email"
                            placeholder="Email"
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
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account?{' '}
                    </p>
                    <div className="text-center mt-2">
                        <button id="registerButton"
                            onClick={handleSignInClick}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {registerComponent()}
        </>
    );
};

export default Register;
