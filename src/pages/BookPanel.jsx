import { useState } from 'react';
import Booking from '../components/booking/Booking';
import Thanks from '../pages/Thanks';
import BookPanel from '../pages/BookPanel';
import NotAvilable from '../pages/NotAvilable';
import { Link } from 'react-router-dom';
const Home = () => {

  const [bookpanel,setBookpanel]=useState(false);

  return (
    <>
    <div className='max-w-5xl px-6 pt-8 pb-10 w-full mx-auto bg-white rounded-lg drop-shadow' id="bookpanel">
           hello
        </div>
    </>
  )
}

export default Home