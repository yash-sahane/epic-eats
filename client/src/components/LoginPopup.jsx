import React from 'react'
import { assets } from '../assets/assets'

const LoginPopup = ({ setAuthPopup }) => {
  const { cross_icon } = assets;

  const linkHandler = () => {
    setAuthPopup('signup');
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-sm'>
      <div className='w-full h-full paddingx flex items-center justify-center'>
        <div className='w-96 bg-white rounded-md p-6 flex flex-col gap-6 text-sm relative'>
          <div className='w-6 absolute right-6 top-6 cursor-pointer p-1' onClick={() => setAuthPopup(null)}><img src={cross_icon} alt="cross_icon" className='w-full' /></div>
          <div><p className='font-bold text-xl xl:text-2xl'>Sign Up</p></div>
          <div className='flex flex-col gap-4'>
            <input type="email" placeholder='Your email' className='input' required />
            <input type="password" placeholder='Password' className='input' required />
          </div>
          <div><button className='bg-primary text-white p-2 xl:p-3 rounded-md w-full'>Create account</button></div>
          <div className='flex gap-2 xl:gap-3'>
            <input type="checkbox" className='xl:w-[20px]' />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <div className='flex gap-1'><p>Don't have an account?<span className='text-primary font-bold underline-after cursor-pointer' onClick={linkHandler}> Signup Here</span></p></div>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup