import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomBar from '../components/navbar/BottomBar';
import { useLocation } from 'react-router-dom';

const BookProcessor = (props) => {
  // Destructure bookingData from props
  const { bookingData } = props;
  // Destructure properties from bookingData
  const { from, to, date, fareType } = bookingData;
  const [travellingData, setTravellingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState(1);

  useEffect(() => {
    // Fetch data from the API only if booking data is not empty
    if (from && to && date) {
      fetchData(from, to, date);
    } else {
      setLoading(false);
    }
  }, [from, to, date]);

  const fetchData = async (from, to, date) => {
    try {
      console.log('request sent to server');
      const response = await axios.get('http://localhost:3001/travellers', {
        params: { from, to, date },
      });
      console.log('request sent to server');
      setTravellingData(response.data);
      setLoading(false);
    } catch (error) {
      console.log('error server');
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleSeatSelection = (index, seats) => {
    setSelectedSeats(seats);
  };

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ backdropFilter: 'blur(5px)', marginTop: '15%', marginBottom: '20%' }}
      >
        <div className="max-w-6xl w-full px-4 lg:px-0 mx-auto">
          {loading ? (
            <p>Loading...</p>
          ) : travellingData.length === 0 ? (
            <div className="large-card">OOPS! No Travelling available right now!</div>
          ) : (
            <div className="booklist">
              {travellingData.map((travel, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-80 rounded-lg shadow-md p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-orange-500">Boarding: {from}</h2>
                        <p className="text-cyan-500"><b>At: {travel.pickuptime.toLocaleString()}</b></p>
                      </div>
                      <div>
                        <h2 className="text-green-500">Dropping: {to}</h2>
                        <p className="text-blue-500"><b>At: {travel.droptime.toLocaleString()}</b></p>
                      </div>
                    </div>
                    <h3 className="mt-4 text-tomato-500">Bus: {travel.travels}</h3>
                    <h4 className="mt-2 text-magenta-500">Fare (Per-Seat): {travel.price}/-</h4>
                    <h5 className="">Available Seats: {travel.availableSeats}</h5>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <label id="seat" htmlFor={`seats-${index}`} className="text-red-500">
                        Selected Seats:
                      </label>
                      <select
                        id={`seats-${index}`}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-md bg-white"
                        value={selectedSeats}
                        onChange={(e) => handleSeatSelection(index, Number(e.target.value))}
                      >
                        {Array.from(
                          { length: travel.availableSeats },
                          (_, i) => i + 1
                        ).map((seat) => (
                          <option key={seat} value={seat}>
                            {seat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p id="payable" className="text-orange-500">PAYABLE Rs {selectedSeats * travel.price}/-</p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookProcessor;