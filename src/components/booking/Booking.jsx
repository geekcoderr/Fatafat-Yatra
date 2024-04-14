import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import BookProcessor from "../../pages/BookProcessor";
import famous from './famous.json';

const Booking = () => {
    const [buttonText, setButtonText] = useState("Check Availability");
    const [multi, setMulti] = useState([1]);
    const [selectedFare, setSelectedFare] = useState("");
    const [regard, setRegard] = useState(5);
    const [errorMessage, setErrorMessage] = useState("");
    const [bookingData, setBookingData] = useState({
        from: '',
        to: '',
        date: '',
        fareType: 5
    });

    const [showBookProcessor, setShowBookProcessor] = useState(false);

    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setButtonText("...Let's CheckIt...");
    };

    const handleMouseLeave = () => {
        setButtonText("Check Availability");
    };

    const handleFareSelection = (fareType, cost) => {
        setSelectedFare(fareType);
        setRegard(cost);
        setBookingData({...bookingData, fareType: cost});
    };

    const getRandomLocation = () => {
        return famous[Math.floor(Math.random() * famous.length)].location;
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
    const [date, setDate] = useState('');

    const setl = (location) => {
        setLoc1(location.toUpperCase());
        setBookingData({...bookingData, from: location.toUpperCase()});
    }

    const setd = (location) => {
        setLoc2(location.toUpperCase());
        setBookingData({...bookingData, to: location.toUpperCase()});
    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        setBookingData({...bookingData, date: selectedDate});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loc1 === loc2) {
            setErrorMessage("Ahh! Both locations cannot be the same.");
            return;
        } else if (!date) {
            setErrorMessage("Ahh! Please select a date.");
            return;
        } else if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
            setErrorMessage("Ahh! Selected date must be today or later.");
            return;
        }
        // Reset error message if validation passes
        setErrorMessage("");
        // Now you can pass bookingData to BookProcessor
        console.log("Booking Data:", bookingData);
        
        // Show the BookProcessor component
        navigateToBookProcessor();
    };

    const navigateToBookProcessor = () => {
        setShowBookProcessor(true);
    };

    return (
        <>
            {!showBookProcessor ? (
        <div className='pt-40 pb-20'>
                <form className='max-w-5xl px-6 pt-8 pb-10 w-full mx-auto bg-white rounded-lg drop-shadow' id="bookpanel" onSubmit={handleSubmit}>
                    <div className='flex items-center justify-between flex-wrap mb-10'>
                        <div className="flex-item">
                            <h1 className="text-4xl font-bold text-center animate-bounce" id="bookid">🌟 Just Select & Book  Your Yatra FATAFAT! 🌟</h1>
                        </div>
                    </div>
                    {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

                    {multi.map((item, index) => 
                        <BookingForm 
                            key={index} 
                            trip={bookingData} 
                            fromValue={loc1} 
                            toValue={loc2} 
                            dateValue={date} 
                            handleFromChange={(e) => setl(e.target.value)} 
                            handleToChange={(e) => setd(e.target.value)} 
                            handleDateChange={handleDateChange} 
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
                        {/* Call handleSubmit function when button is clicked */}
                        <button type="submit" id="bookButton" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='py-4 px-12 rounded-md bg-indigo-600 text-white font-bold'>{buttonText}</button>
                    </div>
                </form>
                </div>
            ) : (
                <BookProcessor bookingData={bookingData} />
            )}
            </>
    );
};

export default Booking;