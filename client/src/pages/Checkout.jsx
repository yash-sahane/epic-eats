import React from 'react'
import HrLine from '../components/HrLine'
import { useStoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, food_list, removeFromCart, getTotalAmount } = useStoreContext();
  const { cross_icon } = assets;
  const totalAmount = getTotalAmount();
  const navigate = useNavigate();

  return (
    <div className='max-container paddingx py-24 pt-48'>
      <div className='flex flex-col items-center md:items-start md:flex-row gap-12 lg:gap-16 text-sm xl:text-base'>
        <div className='flex flex-col  gap-8 w-full msm:w-3/4 md:w-2/4 text-sm xl:text-base'>
          <div>
            <p className='font-bold text-xl xl:text-2xl'>Delivery Information</p>
          </div>
          <form>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-3'>
                <div className='w-2/4'>
                  <input type="text" className='input' placeholder='First name' />
                </div>
                <div className='w-2/4'>
                  <input type="text" className='input' placeholder='Last name' />
                </div>
              </div>
              <div>
                <input type="text" className='input' placeholder='Email address' />
              </div>
              <div>
                <input type="text" className='input' placeholder='Street' />
              </div>
              <div className='flex gap-3'>
                <div className='w-2/4'>
                  <input type="text" className='input' placeholder='City' />
                </div>
                <div className='w-2/4'>
                  <input type="text" className='input' placeholder='State' />
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='w-2/4'>
                  <input type="number" className='input' placeholder='Zip code' />
                </div>
                <div className='w-2/4'>
                  <input type="text" className='input' placeholder='Country' />
                </div>
              </div>
              <div>
                <input type="number" className='input' placeholder='Place' />
              </div>
            </div>
          </form>
        </div>
        <div className='w-full msm:w-3/4 md:w-2/4 flex flex-col gap-4'>
          <p className='font-bold text-xl xl:text-2xl'>Cart Totals</p>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-4 justify-between'><p className='text-gray-500'>Subtotal</p><p className='text-gray-500'>${totalAmount ? totalAmount : 0}</p></div>
            <HrLine />
            <div className='flex gap-4 justify-between'><p className='text-gray-500'>Delivery Fee</p><p className='text-gray-500'>${totalAmount ? 2 : 0}</p></div>
            <HrLine />
            <div className='flex gap-4 justify-between'><p className='font-semibold'>Total</p><p>${totalAmount ? totalAmount + 2 : 0}</p></div>
          </div>
          <button className='bg-primary py-2 xl:py-3 px-4 xl:px-6 w-fit text-white rounded-[4px]'>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout