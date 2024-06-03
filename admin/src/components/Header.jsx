import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logo } = assets;
  const navigate = useNavigate();
  const headerHeight = 90;

  const navigationHandler = (menu) => {
    navigate(`/`);
    setTimeout(() => {
      const element = document.getElementById(menu);
      if (element) {
        const yOffset = -headerHeight;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <div className='fixed z-50 w-full bg-white shadow-md'>
      <div className='max-container flex justify-between items-center py-4 paddingx'>
        <div className='w-16 cursor-pointer flex flex-col gap-1 items-center' onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className='w-full' />
          <p className='text-nowrap text-sm font-semibold'>Admin Panel</p>
        </div>
        <div className='hidden md:block'>
          <ul className='flex gap-6 items-center'>
            {/* <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('home')}>Home</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('explore-menu')}>Explore Menu</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('mobile-app')}>Mobile App</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('contact-us')}>Contact Us</a></li></div> */}
          </ul>
        </div>
        <div className='flex items-center gap-6 msm:gap-8'>
          <div>
            <button className='py-2 px-6 xl:py-3 xl:px-7 rounded-full border border-gray-500'>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header