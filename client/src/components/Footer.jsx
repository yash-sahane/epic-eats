import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  const { logo, facebook_icon, twitter_icon, linkedin_icon } = assets;

  return (
    <div className='bg-bg-gray-black' id='contact-us'>
      <div className='max-container paddingx py-12 flex flex-col md:flex-row justify-between gap-8 text-text-gray'>
        <div className='flex flex-col gap-6 md:w-2/4'>
          <div className='max-md:w-28'><img className='rounded-xl max-md:w-full' src={logo} alt="logo" /></div>
          <p className='text-sm xl:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aliquam ipsa, porro voluptatem nam obcaecati quia nobis quod earum consectetur, nisi quisquam laudantium! Quod nesciunt voluptas similique ipsum dignissimos beatae.</p>
          <div className='flex gap-4'>
            <div className='w-8'><img src={facebook_icon} alt="fb_icon" /></div>
            <div className='w-8'><img src={twitter_icon} alt="twitter_icon" /></div>
            <div className='w-8'><img src={linkedin_icon} alt="linkedin_icon" /></div>
          </div>
        </div>
        <div className='md:w-2/4 flex justify-evenly gap-8 xsm:flex-row flex-col'>
          <div>
            <p className='mb-6 font-bold text-xl xl:text-2xl text-white'>COMPANY</p>
            <div className='flex flex-col gap-4 text-sm xl:text-base'>
              <p>Home</p>
              <p>About us</p>
              <p>Delivery</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <div>
            <p className='mb-6 font-bold text-xl xl:text-2xl text-white'>GET IN TOUCH</p>
            <div className='flex flex-col gap-4 text-sm xl:text-base'>
              <p>+1-212-456-7890</p>
              <p>contact@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer