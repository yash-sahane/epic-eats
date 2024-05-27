import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';

const Header = ({ setAuthPopup }) => {
  const { logo, search_icon, basket_icon } = assets;
  const { cartItems } = useStoreContext();
  const noOfItems = Object.keys(cartItems).length;
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
      <div className='max-container flex justify-between items-center py-4 paddingx gap-4'>
        <div className='w-20 cursor-pointer' onClick={() => navigate('/')}><img src={logo} alt="logo" className='w-full' /></div>
        <div className='hidden md:block'>
          <ul className='flex gap-6 items-center'>
            <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('home')}>Home</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('explore-menu')}>Explore Menu</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('mobile-app')}>Mobile App</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after'><a onClick={() => navigationHandler('contact-us')}>Contact Us</a></li></div>
          </ul>
        </div>
        <div className='flex items-center gap-6 msm:gap-8'>
          <div className='w-[20px]'><img src={search_icon} alt="search_icon" /></div>
          <div className='relative w-[20px] cursor-pointer'><img src={basket_icon} alt="basket_icon" onClick={() => navigate('/cart')} /><div className='absolute -top-3 -right-3 bg-primary h-6 w-6 rounded-full flex justify-center items-center'><p className='text-white text-sm'>{noOfItems}</p></div></div>
          <div><button className='py-2 px-6 xl:py-3 xl:px-7 rounded-full border border-gray-500' onClick={() => setAuthPopup('login')}>Sign In</button></div>
        </div>
      </div>
    </div>
  )
}

export default Header