import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../components/navbar/BottomBar';
import img from '../assets/images/garrett-parker-DlkF4-dbCOU-unsplash.jpg';
import travel from '../assets/images/travel2 (1).jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/Home');
  };
  

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            <span style={{ color: 'rgb(255, 99, 71)' }}>India's</span>{' '}
            <span style={{ color: '' }}>Best <span style={{color:'rgb(255, 99, 71)'}}> LAST MOMENT </span><br /></span> Bus
            <span style={{ color: 'rgb(255, 99, 71)' }}> Booking </span>
            with{' '}
            <br />
            <span style={{ color: 'rgb(255, 99, 71)' }}>Fatafat Yatra!</span>
          </h1>
          <p>
            <span style={{ color: 'rgb(255, 99, 71)' }}>Discover</span> the
            <span style={{ color: 'rgb(255, 99, 71)' }}> top reasons</span> why
            <span style={{ color: 'rgb(255, 99, 71)' }}> Fatafat Yatra</span> is
            the go-to platform for all your bus travel needs.
          </p>
          <ul>
            <li>
              <div className="glass-effect">
                <i className="fas fa-lightning"></i>
                <div>
                  <h3>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>
                      Lightning-Fast
                    </span>{' '}
                    Booking
                  </h3>
                  <p>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>Book</span> your
                    bus tickets in a matter of seconds with our {' '}
                    <span style={{ color: 'rgb(255, 99, 71)' }}>
                      user-friendly
                    </span>{' '}
                    interface.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="glass-effect">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>
                      Extensive Route
                    </span>{' '}
                    Coverage
                  </h3>
                  <p>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>Explore</span> a
                    vast network of bus routes, connecting all major cities
                    across the country.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="glass-effect">
                <i className="fas fa-tags"></i>
                <div>
                  <h3>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>Unbeatable</span>{' '}
                    Prices
                  </h3>
                  <p>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>Get</span> the
                    best deals and discounts on your bus tickets with {' '}
                    <span style={{ color: 'rgb(255, 99, 71)' }}>
                      Fatafat Yatra
                    </span>
                    .
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="glass-effect">
                <i className="fas fa-user-friends"></i>
                <div>
                  <h3>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>
                      Hassle-Free
                    </span>{' '}
                    Cancellations
                  </h3>
                  <p>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>Easily</span>{' '}
                    manage your bookings, including {' '}
                    <span style={{ color: 'rgb(255, 99, 71)' }}>
                      hassle-free
                    </span>{' '}
                    cancellations and refunds.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="glass-effect">
                <i className="fas fa-headphones"></i>
                <div>
                  <h3>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>
                      Dedicated Customer
                    </span>{' '}
                    Support
                  </h3>
                  <p>
                    <span style={{ color: 'rgb(255, 99, 71)' }}>Reach</span> out
                    to our friendly customer support team for any {' '}
                    <span style={{ color: 'rgb(255, 99, 71)' }}>assistance</span>{' '}
                    you may need.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="hero-image">
        <span id="slogan">'....Ab yatra ki tyari karo FataFat!'</span>
<br />
          <img src={img} id="img" alt="Fatafat Yatra" />
        </div>
      </div>
      {/* <div className="book-now-button">
        <button className="glass-effect-button" onClick={handleBookNow}>
          <span style={{ color: 'rgb(255, 255, 255)' }}>Book Now</span>
        </button>
      </div> */}
      {/* <center> <img src={travel} id="img2" alt="Fatafat Yatra" /></center> */}
      <div className="book-now-container">
        <div className="book-now-content" onClick={handleBookNow}>
          <div className="book-now-text">
          <span>L</span>
            <span>e</span>
            <span>t</span>
            <span>s</span>
            <span>&nbsp;</span>
            <span>B</span>
            <span>o</span>
            <span>o</span>
            <span>k</span>
            <span>&nbsp;</span>
            <span>N</span>
            <span>o</span>
            <span>w</span>
          </div>
          <div className="book-now-animation">
            <div className="book-now-circle"></div>
            <div className="book-now-circle"></div>
            <div className="book-now-circle"></div>
            <div className="book-now-circle"></div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default LandingPage;