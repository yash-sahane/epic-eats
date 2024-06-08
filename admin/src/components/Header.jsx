import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context/StoreContext';
import toast from 'react-hot-toast';

const Header = () => {
  const { logo, logout_icon, profile_icon } = assets;
  const navigate = useNavigate();
  const { token, setToken, setAuthPopup } = useStoreContext();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
    toast.success('Logout Successful');
  }

  return (
    <div className='fixed z-50 w-full bg-white shadow-md'>
      <div className='max-container flex justify-between items-center py-4 paddingx'>
        <div className='w-16 cursor-pointer flex flex-col gap-1 items-center' onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className='w-full' />
          <p className='text-nowrap text-sm font-semibold'>Admin Panel</p>
        </div>
        <div className='hidden md:block'>
          <ul className='flex gap-6 items-center'>
          </ul>
        </div>
        <div className='flex items-center gap-6 msm:gap-8'>
          {!token && <div><button className='py-2 px-6 xl:py-3 xl:px-7 rounded-full border border-gray-500' onClick={() => setAuthPopup('login')}>Sign In</button></div>}
          {token && <div className='group w-[20px] relative cursor-pointer'>
            <img src={profile_icon} alt="search_icon" />
            <div className='customer-dropdown pt-2 hidden absolute top-[22px] right-0 overflow-hidden group-hover:flex'>
              <div className='flex-col w-[120px] text-sm items-center cursor-pointer border border-primary bg-[#fef3ee] rounded-md'>
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