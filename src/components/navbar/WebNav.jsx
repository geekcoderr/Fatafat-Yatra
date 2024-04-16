import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Bus from "../../assets/images/bus5.png";
import { useState } from "react";
import loggedinasset from "../../assets/images/loggedin.png";
import notloggedinasset from "../../assets/images/notloggedin.png";
import logofatafat from "../../assets/images/svglogo.svg";
import help from "../../assets/images/help.svg";


const WebNav = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(props.isAuthenticated); // Set initial login state

    useEffect(() => {
        const storedValue = localStorage.getItem('isAuthenticated');
        if(Boolean(storedValue)===true){
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    }, [localStorage.getItem('isAuthenticated')]);
    
    
    const navigate = useNavigate(); // Importing useNavigate hook
    const [expandNav, setExpandNav] = useState(false); // Set initial state for menu expansion
    const [selectedOption, setSelectedOption] = useState(""); // State to manage dropdown selection
    const [arrow, setArrow] = useState('down');
    const [arrowCol, setArrowCol] = useState({ backgroundColor: '#ffa600' });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSignOut = () => {
        // Perform sign out actions here, such as clearing session, etc.
        localStorage.removeItem('isAuthenticated');
        setIsLoggedIn(false);
        localStorage.setItem('username','');
        navigate('/');
    };

    // Toggle menu function
    const handleMenu = () => {
        setExpandNav(!expandNav);
        if (arrow === 'down') {
            setArrow('up');
            setArrowCol({ backgroundColor: '#afa299' });

        }
        else if (arrow === 'up') {
            setArrow('down');
            setArrowCol({ backgroundColor: '#ffa600' });
        }
    };

    // Render sign in/sign out link based on login state
    const renderAuthLink = () => {
        if (isLoggedIn) {
            return (
                <div className="flex items-center relative">
                    <div className="cursor-pointer flex items-center" onClick={() => { handleMenu() }}>
                        <span className="mr-2">
                            <img src={loggedinasset} className="w-9 inline mr-1" alt="bus" />
                            {' '}
                            Account</span>
                        {arrow === 'down' ? (
                            <svg height="24" style={arrowCol} id="dropdown-arrow" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" /></svg>
                        ) : (
                            <svg height="24" style={arrowCol} id="dropdown-arrow" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z" /></svg>
                        )}
                    </div>
                    {expandNav && (
                        <div id="dropdown" className="absolute top-full right-0 mt-2 p-2 border rounded shadow-md w-64" style={{ zIndex: 1000 }}>
                            <ul>
                                <li id="listHover" className="py-2 px-4 rounded-md text-center"><Link to="/profile">Profile</Link></li>
                                <li id="listHover" className="py-2 px-4 rounded-md text-center"><Link to="/mybookings">My Bookings</Link></li>
                                {/* <li id="listHover" className="py-2 px-4 rounded-md text-center"><Link to="/cancel-tickets">Cancel Tickets</Link></li> */}
                                <li id="listHover" className="py-2 px-4 rounded-md text-center"><Link to="/myticket">Show My Ticket</Link></li>
                                <li id="listHover" style={{backgroundColor:'rgb(255, 155, 15)',color:'black'}} className="py-2 px-4 rounded-md text-center"><button onClick={handleSignOut}>Sign Out</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="flex-item">
                    {/* Using Link component for navigation */}
                    <Link to="/sign-in" className="border-1-custom py-2 px-4 rounded-md transition-all duration-300 hover:bg-gray-300">
                        <img src={notloggedinasset} className="w-5 inline mr-1" alt="bus" />
                        Sign In or Register</Link>
                </div>
            );
        }
    };

    return (
        <div className='webnav_area w-full py-4' id="navb">
            <div className="max-w-6xl w-full px-4 lg:px-0 mx-auto">
                <div className="flex items-center justify-between flex-wrap font-bold">
                    <div className="flex-item">
                        <Link to="/">
                            <h2 className='text-3xl font-extrabold inline'>
                                {/* <img src={logo} className="w-12 inline mr-1" alt="bus" /> */}
                                <code id="heading">
                                    {/* FatafAT yAtra  */}
                                    <img src={logofatafat} className="w-12 inline mr-1" alt="bus" id="mainlogo" />

                                </code>
                            </h2>
                        </Link>
                    </div>

                    <div className="flex-item hidden lg:block">
                        <Link id="asset1"  to="/Home" className='mr-3 border-1-custom py-2 px-4 rounded-full transition-all duration-300 hover:bg-gray-300'>
                            <img src={Bus} id="assetimage" className="w-5 inline mr-1" alt="bus" />
                            <span>Buses</span>
                        </Link>
                    </div>
                    <div className="flex-item hidden lg:block">
                        <Link id="asset2" to="/Help" className='mr-3 border-1-custom py-2 px-4 rounded-full transition-all duration-300 hover:bg-gray-300'>
                            <img src={help} id="assetimage" className="w-5 inline mr-1" alt="policies" />
                            <span>Support</span>
                        </Link>
                    </div>

                    {renderAuthLink()}
                </div>
            </div>
        </div>
    );
};

export default WebNav;