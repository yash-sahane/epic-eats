import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Header = ({ setAuthPopup }) => {
  const { logo, search_icon2, basket_icon, profile_icon, bag_icon, logout_icon } = assets;
  const { cartItems, token, setToken, searchInput, setSearchInput } = useStoreContext();
  const [isSearchActive, setisSearchActive] = useState(false);
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

  const searchHandler = (value) => {
    navigationHandler('top-dishes');
    setSearchInput(value);
  }

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
    toast.success('Logout Successful');
  }

  return (
    <div className='fixed z-50 w-full bg-white shadow-md'>
      <div className='max-container flex justify-between items-center py-4 paddingx gap-4'>
        <div className='w-20 cursor-pointer' onClick={() => navigate('/')}><img src={logo} alt="logo" className='w-full' /></div>
        <div className='hidden md:block'>
          <ul className='flex gap-6 items-center'>
            <div className='relative cursor-pointer'><li className='underline-after text-gray-600 hover:text-text-blue text-base'><a onClick={() => navigationHandler('home')}>Home</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after text-gray-600 hover:text-text-blue text-base'><a onClick={() => navigationHandler('explore-menu')}>Explore Menu</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after text-gray-600 hover:text-text-blue text-base'><a onClick={() => navigationHandler('mobile-app')}>Mobile App</a></li></div>
            <div className='relative cursor-pointer'><li className='underline-after text-gray-600 hover:text-text-blue text-base'><a onClick={() => navigationHandler('contact-us')}>Contact Us</a></li></div>
          </ul>
        </div>
        <div className='flex items-center gap-6 msm:gap-8'>
          <div className='flex items-center p-1 bg-white shadow-md rounded-full transition-all'>
            <input type="text" className={`outline-none px-2 transition-all duration-300 text-sm ${!isSearchActive ? 'w-0 px-0' : ''}`} placeholder='Search food items...' onChange={(e) => searchHandler(e.target.value)} value={searchInput} />
            <img src={search_icon2} alt="search_icon" className='w-[32px] cursor-pointer p-2 bg-[#f03e22] rounded-full' onClick={() => { setSearchInput(''); setisSearchActive(prev => !prev) }} />
          </div>
          {token && <div className='relative w-[20px] cursor-pointer'><img src={basket_icon} alt="basket_icon" onClick={() => navigate('/cart')} /><div className='absolute -top-3 -right-3 bg-primary h-6 w-6 rounded-full flex justify-center items-center'><p className='text-white text-sm'>{noOfItems}</p></div></div>}
          {!token && <div><button className='py-2 px-6 xl:py-3 xl:px-7 rounded-full border border-gray-500' onClick={() => setAuthPopup('login')}>Sign In</button></div>}
          {token && <div className='group w-[20px] relative cursor-pointer'><img src={profile_icon} alt="profile_icon" />
            <div className='customer-dropdown pt-2 hidden absolute top-[22px] right-0 overflow-hidden group-hover:flex'>
              <div className='flex-col w-[120px] text-sm items-center cursor-pointer border border-primary bg-[#fef3ee] rounded-md'>
                <div className='hover:text-primary flex gap-2 items-center w-full justify-center py-2' onClick={() => navigate('/orders')}><img src={bag_icon} className='w-6' alt="bag_icon" /><p>Orders</p></div>
                <div className='hover:text-primary flex gap-2 items-center w-full justify-center py-2' onClick={logoutHandler}><img src={logout_icon} className='w-6' alt="bag_icon" /><p>Logout</p></div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Header