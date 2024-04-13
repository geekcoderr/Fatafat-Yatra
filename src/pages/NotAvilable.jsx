import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingList() {
    const navigate=useNavigate();
    return (
        <>
            {navigate('/')}
        </>
    );
};

export default BookingList;
