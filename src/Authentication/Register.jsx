import { Routes, Route, useNavigate, Link } from "react-router-dom";
import WebNav from "../components/navbar/WebNav";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Thanks from "../pages/Thanks";
import SignIn from './SignIn';
import registerAsset from '../assets/images/registering.png';
import '../assets/App.css';

const Register = () => {
    const navigate = useNavigate(); // Importing useNavigate hook

    const handleSignInClick = () => {
        navigate('/sign-in'); // Navigate to sign-in page
    };

    const registerComponent = () => {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg" id="book">
                    <h2 className="text-3xl font-semibold text-center mb-6">
                        <img src={registerAsset} className="w-10 inline mr-1" alt="bus" />
                        {' '}
                        Register
                    </h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
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