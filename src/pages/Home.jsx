import { useState, useEffect } from 'react';
import Booking from '../components/booking/Booking';
import BottomBar from '../components/navbar/BottomBar';
import NotFound from '../pages/NotFound';

const Home = (props) => {
  const storedValue = localStorage.getItem('isAuthenticated');
  const [isAuthenticated, setAuthentication] = useState(storedValue === 'true');

  useEffect(() => {
    const storedValue = localStorage.getItem('isAuthenticated');
    if (storedValue) {
      setAuthentication(storedValue === 'true');
    }
  }, [storedValue]);

  return (
    <div className='main' >
      <div className='booking_area w-full' id="back">
        <div className="max-w-6xl w-full px-4 lg:px-0 mx-auto">
          {isAuthenticated ? <Booking /> : <NotFound />}
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

export default Home;
