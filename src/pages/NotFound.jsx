import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate= useNavigate();

  const [message,setMessage]=useState('Redirect to Login');

  const mousein=()=>{
    setMessage('Redirect to Login ->>>')
  }

  const mouseout=()=>{
      setMessage('Redirect to Login');
  }

  const redirectToLogin = () => {
    navigate('/sign-in');
  };

  

  return (
    <div className='flex justify-center items-center h-screen' style={{backdropFilter: 'blur(5px)'}}>
      <div className="max-w-6xl w-full px-4 lg:px-0 mx-auto">
        <div className="pt-40 pb-20" >
          <div className="max-w-lg w-full bg-white drop-shadow mx-auto rounded-md py-20 px-4 text-center" id="notfound">
            <h2 className='font-extrabold text-3xl' id="notfoundhead">Login Needed Buddy!</h2>
            <p className="text-gray-600 mt-2" id="notfoundmessage">You need to log in to access this page.</p>
            <button id="notfoundbutton" onMouseMove={mousein} onMouseLeave={mouseout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={redirectToLogin}>
              {message}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
