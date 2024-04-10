import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import BottomBar from '../components/navbar/BottomBar';

const HelpForm = (props) => {
  const storedValue = localStorage.getItem('isAuthenticated');
  const [isAuthenticated, setAuthentication] = useState(storedValue === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    if (storedValue) {
      setAuthentication(storedValue === 'true');
    }
  }, []);

  const actiononsubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    if (isAuthenticated) {
      navigate('/thanks');
      console.log('Navigated to thanks');
    } else {
      console.log('User not authenticated');
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex justify-center items-center h-screen">
          <div className="help-form-container">
            <center>
              <div className="help-line">
                Need help? Contact us at <span className="highlight">support@fatafatyatra.in</span>
              </div>
            </center>
            <center>
              <form className="feedback-form" onSubmit={actiononsubmit}>
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <textarea placeholder="Message" required></textarea>
                <button type="submit">Submit</button>
              </form>
            </center>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
              <BottomBar />
    </>
  );
};

export default HelpForm;