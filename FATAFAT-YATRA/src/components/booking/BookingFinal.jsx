import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebNav from '../navbar/WebNav';

function BookingList() {
    const navigate = useNavigate();
    const [routeData, setRouteData] = useState({ from: {}, to: {} });

    useEffect(() => {
        const storedRouteData = localStorage.getItem('route');

        if (storedRouteData) {
            const parsedData = JSON.parse(storedRouteData);
            setRouteData(parsedData);
        } else {
            navigate('/'); // Assuming '/home' is a valid route in your application
        }
    }, [navigate]);

    return (
        <>
            <div className="max-w-6xl w-full px-4 lg:px-0 mx-auto">
                <div className="pt-40 pb-20">
                   under process
                </div>
            </div>
        </>
    );
};

export default BookingList;
