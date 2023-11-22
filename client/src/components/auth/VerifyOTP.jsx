import '../../styles/auth/_VerifyOTP.scss'
import React, { useState, useEffect } from 'react';
import { handle_verify_otp } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const VerifyOTP = ({ confirmationResult, user }) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('otp-input-0').focus();
  }, []);

  const handleInputChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    if (index < otpValues.length - 1 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtpValues(newOtpValues);
  };

  const handleKeyUp = (index, event) => {
    if (event.key === 'Backspace' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setError('');
      if(otpValues.join('').replace(/\s+/g, '').length !== 6){
        setError('Please enter complete OTP..')
        return
      }
      const otp = otpValues.join('');
      const response = await handle_verify_otp(confirmationResult, otp);
      console.log(response);
      console.log('OTP verified');

      navigate('/dashboard')

    } catch (error) {
      console.log(`OTP Verify Error --> ${error}`);
      setError('OTP Verification Failed');
    }
  };

  const isButtonActive = otpValues.every((value) => value !== '');

  return (
    <div className="verify-otp-page">
      <div className="container">
        <h4>Enter OTP</h4>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-box">
            {otpValues.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="number"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyUp={(e) => handleKeyUp(index, e)}
                min="0"
                max="9"
                inputMode="numeric"
              />
            ))}
          </div>
          <button onClick={handleVerifyOTP} className={isButtonActive ? 'active' : ''}>
            Verify OTP
          </button>
        </form>
        {error !== '' && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default VerifyOTP;
