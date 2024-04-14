import React, { useEffect, useState } from 'react';
import profilePic from '../../assets/images/busin.png';
import BottomBar from '../../components/navbar/BottomBar';
import axios from 'axios';


const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="eye-icon"
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="eye-icon"
  >
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
);

const Profile = () => {


  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const nul='';
  const [profileData, setProfileData] = useState({
    id: nul,
    username: nul,
    password: nul,
    email: nul,
    accountCreationDate: nul,
    accountCreationTime: nul,
  });


  useEffect(()=>{
    const username=localStorage.getItem('username');
    axios.get(`http://localhost:3001/profile/${username}`).then((response) => {
      setProfileData(response.data);
    }).catch(error=>{
      console.log(error);
    });

  });


  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h1 className="profile-title">Fatafat Yatra Profile</h1>
            <img src={profilePic} alt="Profile" className="profile-image" />
            <div className="username-container">
              <h2 style={{
                background: 'linear-gradient(to right, #E91E63, #9C27B0, #673AB7, #3F51B5, #2196F3, #03A9F4, #00BCD4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                @{profileData.username}
              </h2>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label detail-label-green">ID:</span>
              <span className="detail-value">{profileData._id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label detail-label-orange">Username:</span>
              <span className="detail-value">{profileData.username}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label detail-label-blue">Password:</span>
              <div className="password-container">
                <span className="detail-value">{showPassword ? profileData.password : '******'}</span>
                <button className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label detail-label-cherry">Email:</span>
              <span className="detail-value">{profileData.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label detail-label-green">Account Creation Date:</span>
              <span className="detail-value">{profileData.accountCreationDate}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label detail-label-orange">Account Creation Time:</span>
              <span className="detail-value">{profileData.accountCreationTime}</span>
            </div>
            <div className="detail-row">
            <span className="detail-label text-red-500">Wallet Credits:</span>
              <span className="detail-value text-orange-500"><b>© {profileData.balance}</b></span>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Profile;