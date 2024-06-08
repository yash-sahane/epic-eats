import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { RxCross2 } from "react-icons/rx";
import { SERVER_URI } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStoreContext } from '../context/StoreContext';

const LoginPopup = ({ setAuthPopup }) => {
  const { eye_icon } = assets;
  const [isPassShown, setIsPassShown] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { setToken } = useStoreContext();

  const linkHandler = () => {
    setAuthPopup('signup');
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const submitHandler = async () => {
    const errors = {};
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length) {
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URI}/api/user/login`, {
        email: data.email, password: data.password
      })
      const { message, token } = response.data;
      toast.success(message);
      localStorage.setItem('token', token);
      setToken(token);
      setAuthPopup(null);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e.response);
    }
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm'>
      <div className='w-full h-full paddingx flex items-center justify-center'>
        <div className='w-96 bg-white rounded-md p-6 flex flex-col gap-6 text-sm relative shadow-lg'>
          <div className='absolute right-6 top-6 cursor-pointer p-1' onClick={() => setAuthPopup(null)}><RxCross2 className='text-lg' /></div>
          <div><p className='font-bold text-xl xl:text-2xl'>Login</p></div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <div>
                <input type="email" placeholder='Your email' className='input' name='email' required value={data.email} onChange={onChangeHandler} />
                {errors.email && <p className='ml-2 text-sm text-primary'>{errors.email}</p>}
              </div>
            </div>
            <div className='relative'>
              <img src={eye_icon} alt="eye_icon" className='absolute right-2 top-[10px] max-xl:top-[8px] max-xl:w-[22px] cursor-pointer' onClick={() => setIsPassShown(prev => !prev)} />
              <input type={isPassShown ? "text" : "password"} placeholder='Password' className='input !pr-8' name='password' required value={data.password} onChange={onChangeHandler} />
              {errors.password && <p className='ml-2 text-sm text-primary'>{errors.password}</p>}
            </div>
          </div>
          <div><button className='bg-primary text-white p-2 xl:p-3 rounded-md w-full' onClick={submitHandler}>Login</button></div>
          <div className='flex gap-2 xl:gap-3'>
            <input type="checkbox" readOnly className='xl:w-[20px]' checked />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <div className='flex gap-1'><p>Don't have an account?<span className='text-primary font-bold underline-after cursor-pointer' onClick={linkHandler}>{' '}Signup Here</span></p></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup