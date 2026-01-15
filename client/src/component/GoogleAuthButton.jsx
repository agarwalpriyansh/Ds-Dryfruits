import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

const GoogleAuthButton = ({ text = "Sign in with Google" }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  
  const handleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleError = () => {
    console.log('Google Login Failed');
  };

  return (
    <div className="w-full flex justify-center my-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text={text}
        width="100%"
        theme="filled_blue"
        shape="rectangular"
      />
    </div>
  );
};

export default GoogleAuthButton;
