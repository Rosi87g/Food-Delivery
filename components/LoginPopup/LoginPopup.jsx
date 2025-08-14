import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Sign Up');

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (currState === 'Sign Up' && data.name.trim().length < 2) {
      toast.warn('Please enter a valid name');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.warn('Please enter a valid email address');
      return false;
    }

    if (data.password.length < 6) {
      toast.warn('Password should be at least 6 characters');
      return false;
    }

    return true;
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    let newUrl = url + (currState === 'Login' ? '/api/user/login' : '/api/user/register');

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);

        toast.success(
          currState === 'Login'
            ? 'Login successful 🎉'
            : 'Registration successful 🎉'
        );
      } else {
        const msg = response.data.message?.toLowerCase();

        if (msg.includes('user already exists')) {
          toast.warn('User already exists. Try logging in.');
        } else if (msg.includes('password mismatch')) {
          toast.warn('Incorrect password. Please try again.');
        } else if (msg.includes('email does not exist')) {
          toast.warn('Email not registered. Please sign up.');
        } else {
          toast.warn(response.data.message || 'Something went wrong.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error.message);
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt='Close'
          />
        </div>

        <div className='login-popup-inputs'>
          {currState === 'Login' ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Enter your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Enter email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Enter password'
            required
          />
        </div>

        <button type='submit'>
          {currState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};


export default LoginPopup;
