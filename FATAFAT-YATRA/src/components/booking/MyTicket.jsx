import React, { useState } from 'react';
import axios from 'axios';
import BottomBar from '../navbar/BottomBar';

const BookingList = () => {
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchError, setSearchError] = useState(false);

    const handleSearch = async () => {
        if (!searchId) {
            setSearchError(true);
            setSearchResult(null);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/booked/${searchId}`);
            setSearchResult(response.data[0]);
            setSearchError(false);
        } catch (error) {
            console.error('Error fetching booking:', error);
            setSearchResult(null);
            setSearchError(true);
        }
    };

    return (
        <>
        <div className="flex justify-center items-center" style={{ height: '100vh', backdropFilter: 'blur(10px)' }}>
      <div className="space-y-8 w-3/4" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="bg-black bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-2 text-white w-full max-w-md"
          />
          <button
            onClick={handleSearch}
            className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg ml-2 ${
              !searchId ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!searchId}
          >
            Get My Ticket
          </button>
        </div>

        {searchResult && (
          <div className="space-y-8 w-3/4 mx-auto">
            <h1 className="text-white text-2xl font-bold text-center mb-4" style={{ fontSize: '30px' }}>
              Booking Details for {searchResult.bookingId}
            </h1>
            <div className="bg-black bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-4 flex items-center">
              <div className="flex-grow">
                <h2 className="text-orange-500 text-lg font-bold mb-2">
                  Booking ID: {searchResult.bookingId}
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="text-green-500 text-sm font-medium">Pickup:</h3>
                    <p className="text-gray-400">{searchResult.pickupLocation}</p>
                    <p className="text-gray-400">{searchResult.pickupTime}</p>
                  </div>
                  <div>
                    <h3 className="text-red-500 text-sm font-medium">Drop:</h3>
                    <p className="text-gray-400">{searchResult.dropLocation}</p>
                    <p className="text-gray-400">{searchResult.dropTime}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-orange-500 text-sm font-medium">Agency Details:</h3>
                    <p className="text-gray-400">{searchResult.travellerName}</p>
                  </div>
                  <div>
                    <h3 className="text-green-500 text-sm font-medium">Seats Booked:</h3>
                    <p className="text-gray-400">{searchResult.seatsBooked}</p>
                  </div>
                  <div>
                    <h3 className="text-red-500 text-sm font-medium">Discount Availed:</h3>
                    <p className="text-gray-400">{searchResult.discount}%</p>
                  </div>
                  <div>
                    <h3 className="text-orange-500 text-sm font-medium">Ticket Price Per Seat:</h3>
                    <p className="text-gray-400">© {(searchResult.amountPayed / searchResult.seatsBooked).toFixed(2)}/-</p>
                  </div>
                  <div>
                    <h3 className="text-purple-500 text-sm font-medium">Total Amount Paid:</h3>
                    <p className="text-gray-400">© {searchResult.amountPayed}/-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

                    {!searchResult && searchError && (
                        <div className="flex justify-center items-center" style={{ marginTop:'0', backdropFilter: 'blur(10px)' }}>
                            <h1 className="text-red-500 text-2xl font-bold mb-4" id="nobooking-">
                                Either booking is not there or invalid ID.
                            </h1>
                        </div>
                    )}

                </div>
            </div>
            <BottomBar />
        </>
    );
};

export default BookingList;