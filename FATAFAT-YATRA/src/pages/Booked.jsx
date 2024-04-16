import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Booked = (props) => {
    // console.log(props.data);
    const { id, from, to, pickup, drop, travels, seats, discount, customer, payable } = props.data;

    const [isBooked, SetBooked] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const sendBookingData = () => {
            const dataToSend = {
                pickupLocation: `${from} Central Parking`,
                dropLocation: `${to} Central Parking`,
                pickupTime: new Date(pickup).toLocaleString(),
                dropTime: new Date(drop).toLocaleString(),
                discount: Number(discount),
                amountPayed: Number(payable),
                travellerName: travels,
                bookingId: id,
                seatsBooked: seats,
            };

            axios.post('http://localhost:3001/booked', dataToSend)
                .then(() => {
                    SetBooked(true);
                    setShowMessage(true); // Show message after successful booking
                })
                .catch(error => {
                    SetBooked(false);
                    console.error('Error sending booking data:', error);
                });
        };

        sendBookingData(); // Call the function to send booking data when component mounts

        const timer = setTimeout(() => {
            setShowMessage(true); // Show message after 3 seconds even if booking fails
        }, 3000);

        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures useEffect runs only once

    if (!props.data || isBooked === false) {
        return (
            <div className="bg-black bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-6 max-w-2xl w-full" style={{ height: 'auto', padding: '60px' }} >
                <h1 className="text-red-500 text-2xl font-bold mb-4">Booking Failed with some Server Error! <br /> Try Booking Again!</h1>
                <br />
                <Link to="/" className="mr-3 border-2 text-red-500 hover:text-black border-red-500 py-2 px-4 rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white" >
                    <span>Book Again!</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-black bg-opacity-80 backdrop-blur-md rounded-lg shadow-md p-6 max-w-2xl w-full" style={{ height: 'auto' }} >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-orange-500 text-2xl font-bold">Congratulations <span className="text-green-500 text-2xl font-bold">@{localStorage.getItem('username')}</span>! Booking Confirmed</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-green-500 text-lg font-medium">Pickup Location:</h3>
                    <p className="text-gray-400">{from} Central Parking</p>
                </div>
                <div>
                    <h3 className="text-red-500 text-lg font-medium">Drop Location:</h3>
                    <p className="text-gray-400">{to} Central Parking</p>
                </div>
                <div>
                    <h3 className="text-red-500 text-lg font-medium">Pickup Time:</h3>
                    <p className="text-gray-400">{new Date(pickup).toLocaleString()}</p>
                </div>
                <div>
                    <h3 className="text-purple-500 text-lg font-medium">Drop Time:</h3>
                    <p className="text-gray-400">{new Date(drop).toLocaleString()}</p>
                </div>
                <div>
                    <h3 className="text-orange-500 text-lg font-medium">Your Travells Agency:</h3>
                    <p className="text-gray-400">{travels}</p>
                </div>
                <div>
                    <h3 className="text-green-500 text-lg font-medium">Seats Booked:</h3>
                    <p className="text-gray-400">{seats}</p>
                </div>
                <div>
                    <h3 className="text-orange-500 text-lg font-medium">Discount:</h3>
                    <p className="text-gray-400">{discount}% for {customer}</p>
                </div>
                <div>
                    <h3 className="text-red-500 text-lg font-medium">You Have Payed:</h3>
                    <p className="text-gray-400">© {payable}/-</p>
                </div>
            </div>
            <div className="mt-6 flex justify-left">
                <p className="text-lg font-medium text-purple-500">
                    <h3 className="text-red-500 text-lg font-medium">Please Note Your Booking ID:</h3> Booking ID: {id}
                </p>
            </div>
            {showMessage && (
                <Link to='/'>
                    <div style={{ marginTop: '30px' }} className="right bottom-4 left-1/2 transform translate-x-1/3 bg-green-500 text-white px-4 py-2 rounded-md animate-slide-up">
                        Thank you for booking! <b>WANNA BOOK MORE.</b>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default Booked;
