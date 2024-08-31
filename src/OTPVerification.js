



import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';
import logo from './nuqi-gold-icon.png';

function OTPVerification() {
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate('/dashbord');
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <img src={logo} className="blox-logo" alt="Nuqi Logo" /> {/* Added alt attribute */}
        <h2>OTP VERIFICATION</h2>
        <p>Enter the verification code we just sent on your phone number.</p>
      
        <div className="otp-input">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
        </div>
        <button className="verify-button" onClick={handleVerify}>Verify</button>
        <div className="resend-otp">
          <p>Didn't receive OTP? <a href="/">Resend</a></p>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;




