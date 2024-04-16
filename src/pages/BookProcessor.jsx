import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import error from './location-not-found.svg';
import Booked from './Booked';

const BookProcessor = (props) => {
  // Destructure bookingData from props
  const { bookingData } = props;
  // Destructure properties from bookingData
  const { from, to, date, fareType } = bookingData;
  const faretype = fareType;
  const [booked, setBooked] = useState(false);
  const [farePosition, setFarePosition] = useState('');

  useEffect(() => {
    if (fareType === 5) {
      setFarePosition('Regular');
    } else if (fareType === 10) {
      setFarePosition('Armed Forces');
    } else if (fareType === 15) {
      setFarePosition('Senior Citizen');
    } else {
      setFarePosition('Student');
    }
  }, [fareType]);


  const [travellingData, setTravellingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState(1);

  const [selectedData, setSelectedData] = useState({});

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

  const seatsElement = useRef(null);
  const pickpuElement = useRef(null);
  const dropElement = useRef(null);
  const [ticketData, setTicketData] = useState({});
  const [message, setMessage] = useState('');
  const payable = useRef(null);


  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const username = localStorage.getItem('username');
    axios.get(`http://localhost:3001/profile/${username}`).then((response) => {
      setBalance(response.data.balance);
    }).catch(error => {
      console.log(error);
      setBalance(0);
    });

  });

  const handleBooking = (travel) => {
    const payableAmount = (selectedSeats * travel.price) - ((selectedSeats * travel.price * fareType) / 100);

    if (Number(balance) >= Number(payableAmount)) {
      const finalRef = {
        id: travel._id,
        from: travel.from,
        to: travel.to,
        pickup: travel.pickuptime,
        drop: travel.droptime,
        price: travel.price,
        travels: travel.travels,
        from: pickpuElement.current.innerText,
        to: dropElement.current.innerText,
        seats: seatsElement.current.value,
        discount: faretype,
        customer: farePosition,
        payable: payableAmount,
      };

      setTicketData(finalRef);
      setMessage(null);
      // console.log(ticketData);
      
      const handleCreditUpdate = async () => {
        console.log('deducted');
        try {
          await axios.post('http://localhost:3001/creditupdate', {
            username: localStorage.getItem('username'),
            deductionAmount: payableAmount, // Convert deductionAmount to an integer
          }
        );
        // console.log(payableAmount);
        } catch (error) {
          console.error('Error:', error);
          setMessage('An error occurred while updating the balance');
        }
      };
      
      handleCreditUpdate();

      setBooked(true); // Set booked to true

    } else {
      // console.log(payableAmount, balance);
      setMessage('You Have Insufficient Credit Balance to Book!');
    }
  };


  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ backdropFilter: 'blur(5px)', marginTop: '15%', marginBottom: '20%' }}
      >{booked === false ? (

        <div className="max-w-6xl w-full px-4 lg:px-0 mx-auto">
          {loading ? (
            <div className="w-full drop-shadow mx-auto rounded-md py-20 px-4 text-center" style={{ height: '90vh' }}>
              <p>Loading...</p>
            </div>
          ) : travellingData.length === 0 ? (
            <div className="w-full drop-shadow mx-auto rounded-md py-20 px-4 text-center" style={{ height: '90vh' }}>
              <span id="error">
                <img src={error} alt='error' style={{ width: '150px', margin: '30px' }} />
                OOPS! We Can't Find Routes right now!
              </span>
            </div>
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
                        <h2 className="text-orange-500">Boarding: <span ref={pickpuElement}>{from}</span></h2>
                        <p className="text-cyan-500">
                          <b>
                            At:{' '}
                            {new Date(travel.pickuptime).toLocaleString('en-US', {
                              hour12: false,
                              hour: '2-digit',
                              minute: '2-digit',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </b>
                        </p>
                      </div>
                      <div>
                        <h2 className="text-green-500" >Dropping: <span ref={dropElement}>{to}</span></h2>
                        <p className="text-blue-500">
                          <b>
                            At:{' '}
                            {new Date(travel.droptime).toLocaleString('en-US', {
                              hour12: false,
                              hour: '2-digit',
                              minute: '2-digit',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </b>
                        </p>
                      </div>
                    </div>
                    <h3 className="mt-4 text-tomato-500" >Bus: {travel.travels}</h3>
                    <h4 className="mt-2 text-magenta-500">Fare (Per-Seat): © {travel.price} Credits</h4>
                    <h5 className="">Available Seats: {travel.availableSeats}</h5>
                    <h6 className="mt-4 text-tomato-500" >Fare Discount: {fareType}% for {farePosition} Customer</h6>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <label id="seat" htmlFor={`seats-${index}`} className="text-red-500">
                        Selected Seats:
                      </label>
                      <select
                        ref={seatsElement}
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
                    {message && (
                      <p className="text-red-500 font-bold text-center mb-4 pb-4">{message}</p>
                    )}
                    <div>
                      <p id="payable" className="text-orange-500" >
                        PAYABLE © <span ref={payable}>{(selectedSeats * travel.price) - ((selectedSeats * travel.price * fareType) / 100)}</span>/-
                      </p>
                      <button onClick={() => handleBooking(travel)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) :
        (
          <div className="flex justify-center items-center h-screen" style={{ marginTop: '-15vh' }} >
            <Booked data={ticketData} />
          </div>
        )
        }
      </div>
    </>
  );
};



export default BookProcessor;