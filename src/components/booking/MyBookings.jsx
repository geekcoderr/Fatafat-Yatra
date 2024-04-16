import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomBar from '../navbar/BottomBar';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/booked');
        setBookings(response.data);
        setIsLoading(false);
        // console.log(response.data);
        setIsError(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) {
    return (
        <>
        <div className="flex justify-center" style={{ backdropFilter: 'blur(10px)' }}>
        
        <div className="space-y-8 w-3/4" style={{height:'100vh', marginBottom: '6%',marginTop: '5%', backdropFilter: 'blur(10px)' }}>
        
        <h1 className="text-red-500 text-2xl font-bold mb-4" id="nobooking-loading" >
          Loading...
        </h1>
        </div>
      </div>
      <BottomBar />
    </>
    );
  }

  if (isError || bookings.length === 0) {
    return (
        <>
        <div className="flex justify-center" style={{ backdropFilter: 'blur(10px)' }}>
        
        <div className="space-y-8 w-3/4" style={{height:'100vh', marginBottom: '6%',marginTop: '5%', backdropFilter: 'blur(10px)' }}>
        
        <h1 className="text-red-500 text-2xl font-bold mb-4" id="nobooking">
          {isError
            ? 'Error fetching bookings. Please try again later.'
            : 'OOPS! No Previous Bookings found.'}
        </h1>
        </div>
      </div>
      <BottomBar />
    </>
    );
  }

  return (
    <>
      <div className="flex justify-center" style={{ backdropFilter: 'blur(10px)' }}>
        
        <div className="space-y-8 w-3/4" style={{ marginBottom: '6%',marginTop: '5%', backdropFilter: 'blur(10px)' }}>
        <h1 className="text-white text-2xl font-bold text-center" style={{margin:'5%',fontSize:'30px'}}>
            You have {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
          </h1>
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-black bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-4 flex items-center"
            >
              <div className="flex-grow">
                <h2 className="text-orange-500 text-lg font-bold mb-2">
                  Booking ID: {booking.bookingId}
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="text-green-500 text-sm font-medium">Pickup:</h3>
                    <p className="text-gray-400">{booking.pickupLocation}</p>
                    <p className="text-gray-400">{booking.pickupTime}</p>
                  </div>
                  <div>
                    <h3 className="text-red-500 text-sm font-medium">Drop:</h3>
                    <p className="text-gray-400">{booking.dropLocation}</p>
                    <p className="text-gray-400">{booking.dropTime}</p>
                  </div>
                  <div>
                    <h3 className="text-orange-500 text-sm font-medium">Agency Details:</h3>
                    <p className="text-gray-400">{booking.travellerName}</p>
                  </div>
                  <div>
                    <h3 className="text-green-500 text-sm font-medium">Seats Booked:</h3>
                    <p className="text-gray-400">{booking.seatsBooked}</p>
                  </div>
                  <div>
                    <h3 className="text-red-500 text-sm font-medium">Discount Availed:</h3>
                    <p className="text-gray-400">{booking.discount}%</p>
                  </div>
                  <div>
                    <h3 className="text-orange-500 text-sm font-medium">Ticket Price Per Seat:</h3>
                    <p className="text-gray-400">© {(booking.amountPayed / booking.seatsBooked).toFixed(2)}/-</p>
                  </div>
                  <div>
                    <h3 className="text-purple-500 text-sm font-medium">Total Amount Paid:</h3>
                    <p className="text-gray-400">© {booking.amountPayed}/-</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default BookingList;