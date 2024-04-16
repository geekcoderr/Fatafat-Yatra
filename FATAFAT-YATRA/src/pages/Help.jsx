import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
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
  }, [storedValue]);

  const actiononsubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (isAuthenticated) {
      try {
        const formData = new FormData(event.target);
        const response = await axios.post('http://localhost:3001/support', {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        });
        console.log('Data sent successfully:', response.data);
        navigate('/thanks');
        console.log('Navigated to thanks');
      } catch (error) {
        console.error('Error sending data:', error);
      }
    } else {
      console.log('User not authenticated');
    }
  };


  
  return (
    <div style={{ backdropFilter: 'blur(5px)' }} >
      {isAuthenticated ? (
        <div className="flex justify-center items-center h-screen">
          <div className="help-form-container">
            <center>
              <div className="help-line">
                Need help? Contact us at <span className="highlight">support@fatafatyatra.in</span>
              </div>
            </center>
            <center>
              <form className="feedback-form " onSubmit={actiononsubmit} id="help">
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <textarea name="message" placeholder="Message" required></textarea>
                <button type="submit">Submit</button>
              </form>
            </center>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
      <BottomBar />
    </div>
  );
};

export default HelpForm;
