import React from 'react';
import logo from "../../assets/images/busfin.png";

const BottomBar = () => {
  return (
    <div className="bottom-bar bg-gray-900 text-white p-4 flex flex-col md:flex-col justify-between items-center" style={{background:'rgb(200, 80, 94)'}}>
      <div className="bottom-bar-option flex items-center mb-4 md:mb-0" >
        <br />
        <br />
        <img src={logo} className="w-12 inline mr-1" alt="bus" />
        {' '}
        <span className="font-bold text-xl">Fatafat Yatra</span>
      </div>
      <br />
      <div className="bottom-bar-options flex p-4 flex-col md:flex-row justify-evenly items-center flex-wrap">
        <span className="mr-4 mb-2 cursor-pointer">About Fatafat Yatra</span>
        <span className="mr-4 mb-2 cursor-pointer">About us</span>
        <span className="mr-4 mb-2 cursor-pointer">Mobile version</span>
        <span className="mr-4 mb-2 cursor-pointer">Sitemap</span>
        <span className="mr-4 mb-2 cursor-pointer">Offers</span>
        <span className="mr-4 mb-2 cursor-pointer">Careers</span>
        <span className="mr-4 mb-2 cursor-pointer">T&C</span>
        <span className="mr-4 mb-2 cursor-pointer">Privacy policy</span>
        <span className="mr-4 mb-2 cursor-pointer">FAQ</span>
        <span className="mr-4 mb-2 cursor-pointer">Bus operator registration</span>
      </div>
    </div>
  );
};

export default BottomBar;
