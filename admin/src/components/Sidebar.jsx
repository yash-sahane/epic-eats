import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { add_icon, order_icon } = assets;
  const navigate = useNavigate();

  return (
    <div className='mt-28 border-r-2 border-r-gray-300 md:w-52'>
      <div className='flex flex-col items-end gap-4 text-sm mt-14'>
        <div className='flex gap-2 py-2 px-4  w-fit min-w-[54px]  md:w-48  items-center border-t-2 border-l-2 border-b-2 border-t-gray-300 border-l-gray-300 border-b-gray-300 rounded-tl-md rounded-bl-md cursor-pointer' onClick={() => navigate('/')}><img src={add_icon} alt="add_icon" /><p className='max-md:hidden'>Add Item</p></div>
        <div className='flex gap-2 py-2 px-4 w-fit min-w-[54px] md:w-48  items-center border-t-2 border-l-2 border-b-2 border-t-gray-300 border-l-gray-300 border-b-gray-300 rounded-tl-md rounded-bl-md cursor-pointer' onClick={() => navigate('/list')}><img src={order_icon} alt="order_icon" /><p className='max-md:hidden'> Items</p></div>
        <div className='flex gap-2 py-2 px-4  w-fit min-w-[54px]  md:w-48 items-center border-t-2 border-l-2 border-b-2 border-t-gray-300 border-l-gray-300 border-b-gray-300 rounded-tl-md rounded-bl-md cursor-pointer' onClick={() => navigate('/order')}><img src={order_icon} alt="add_icon" /><p className='max-md:hidden'>Orders</p></div>
      </div>
    </div>
  )
}

export default Sidebar