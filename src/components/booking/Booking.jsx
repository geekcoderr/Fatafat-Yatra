import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";
import famous from './famous.json';

const Booking = () => {
    const [buttonText, setButtonText] = useState("Check Availability");
    const [multi, setMulti] = useState([1]);
    const [trip, setTrip] = useState([{ tripType: "", vehicleType: "" }]);
    const [selectedFare, setSelectedFare] = useState("");
    const [regard, setRegard] = useState(5);

    const handleMouseEnter = () => {
        setButtonText("...Let's CheckIt...");
    };

    const handleMouseLeave = () => {
        setButtonText("Check Availability");
    };

    const handleFareSelection = (fareType, cost) => {
        setSelectedFare(fareType);
        setRegard(cost);
    };

    const getRandomLocation = () => {
        return famous[Math.floor(Math.random() * famous.length)].location; // Access the 'location' property
    };

    const getUniqueRandomLocations = () => {
        let location1 = getRandomLocation();
        let location2 = getRandomLocation();

        // Ensure no two locations are the same
        while (location2 === location1) {
            location2 = getRandomLocation();
        }

        return [location1, location2];
    };

    const [randomLocation1, randomLocation2] = getUniqueRandomLocations();

    const to = randomLocation1;
    const from = randomLocation2;

    const [loc1, setLoc1] = useState('');
    const [loc2, setLoc2] = useState('');

    const setl = (location) => {
        setLoc1(location.toUpperCase());
    }

    const setd = (location) => {
        setLoc2(location.toUpperCase());
    }


    return (
        <div className='pt-40 pb-20' >
            <form className='max-w-5xl px-6 pt-8 pb-10 w-full mx-auto bg-white rounded-lg drop-shadow' id="bookpanel">
                <div className='flex items-center justify-between flex-wrap mb-10'>
                    <div className="flex-item">
                        <h1 className="text-4xl font-bold text-center animate-bounce" id="bookid">🌟 Just Select & Book  Your Yatr! 🌟</h1>
                    </div>
                </div>

                {/* {multi.map((item, index) => <BookingForm key={index} trip={trip} from={loc1} to={loc2} />)} */}
                {multi.map((item, index) => 
                    <BookingForm 
                        key={index} 
                        trip={trip} 
                        fromValue={loc1} 
                        toValue={loc2} 
                        handleFromChange={(e) => setLoc1(e.target.value)} 
                        handleToChange={(e) => setLoc2(e.target.value)} 
                    />
                )}

                <div className="flex items-center justify-between flex-wrap mb-10">
                    <div className="flex-item" >
                        <h2 className='text-xl font-bold mb-3'>Who Are You?:</h2>
                        <span id="fare" className={`inline-block mb-2 lg:mb-0 p-2 rounded mr-1 transition-all font-bold duration-300 ${selectedFare === 'Regular' ? 'bg-green-500' : 'bg-orange-500'}`} onClick={() => handleFareSelection('Regular', 5)}>Regular</span>
                        <span id="fare" className={`inline-block mb-2 lg:mb-0 p-2 rounded mr-1 transition-all font-bold duration-300 ${selectedFare === 'Armed Forces' ? 'bg-green-500' : 'bg-orange-500'}`} onClick={() => handleFareSelection('Armed Forces', 10)}>Armed Forces</span>
                        <span id="fare" className={`inline-block mb-2 lg:mb-0 p-2 rounded mr-1 transition-all font-bold duration-300 ${selectedFare === 'Senior Citizen' ? 'bg-green-500' : 'bg-orange-500'}`} onClick={() => handleFareSelection('Senior Citizen', 15)}>Senior Citizen</span>
                        <span id="fare" className={`inline-block mb-2 lg:mb-0 p-2 rounded mr-1 transition-all font-bold duration-300 ${selectedFare === 'Student' ? 'bg-green-500' : 'bg-orange-500'}`} onClick={() => handleFareSelection('Student', 23)}>Student</span>
                    </div>
                    <div className="flex-item mt-2 lg:mt-0">
                        <h2 className='text-lg font-bold mb-3'>Most Searched Location:</h2>
                        <span onClick={() => setl(to)} className='inline-block font-bold mb-2 lg:mb-0 p-2 bg-gray-200 rounded ml-1 transition-all duration-300 hover:bg-gray-300' id="most">{to}</span>
                        <span onClick={() => setd(from)} className='inline-block mb-2 lg:mb-0 font-bold p-2 bg-gray-200 rounded ml-1 transition-all duration-300 hover:bg-gray-300' id="most">{from}</span>
                    </div>
                </div>

                <div className="w-full text-center pt-10">
                    <Link to='/bookinglist' id="bookButton" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='py-4 px-12 rounded-md bg-indigo-600 text-white font-bold'>{buttonText}</Link>
                </div>
            </form>
        </div>
    );
};

export default Booking;
