import React, { useState, useEffect } from 'react';

const BookingForm = ({ index, trip, fromValue, toValue, dateValue, handleFromChange, handleToChange, handleDateChange }) => {
    return (
        <div className='flex flex-col lg:flex-row items-center justify-between mb-10'>
            <fieldset className='flex-1 border border-gray-300 rounded-md p-2 lg:mx-1 lg:mb-0 mb-4'>
                <legend className='font-bold text-lg mb-2'>From</legend>
                <input
                    required
                    id="inputform"
                    type="text"
                    placeholder='Where from'
                    value={fromValue}
                    onChange={handleFromChange}
                    className='rounded p-2 w-full font-bold focus:outline-none focus:ring-2 focus:ring-tomato'
                />
            </fieldset>
            <fieldset className='flex-1 border border-gray-300 rounded-md p-2 lg:mx-1 lg:mb-0 mb-4'>
                <legend className='font-bold text-lg mb-2'>To</legend>
                <input
                    required
                    id="inputform"
                    type="text"
                    placeholder='to where'
                    value={toValue}
                    onChange={handleToChange}
                    className='rounded p-2 w-full font-bold focus:outline-none focus:ring-2 focus:ring-tomato'
                />
            </fieldset>
            <fieldset className='flex-1 border border-gray-300 rounded-md p-2 lg:mx-1 lg:mb-0 mb-4'>
                <legend className='font-bold text-lg mb-2'>Departure</legend>
                <input
                    required
                    id="inputformdate"
                    type="date"
                    value={dateValue}
                    onChange={handleDateChange}
                    className='rounded p-2 w-full font-bold focus:outline-none focus:ring-2 focus:ring-tomato'
                />
            </fieldset>
        </div>
    );
}

export default BookingForm;
