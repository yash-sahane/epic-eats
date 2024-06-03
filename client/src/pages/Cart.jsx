import React from 'react'
import HrLine from '../components/HrLine'
import { useStoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { SERVER_URI } from '../main';

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalAmount } = useStoreContext();
  const { cross_icon } = assets;
  const totalAmount = getTotalAmount();
  const navigate = useNavigate();
  // console.log(foodList);

  return (
    <div className='max-container paddingx py-24 pt-48'>
      <div className='grid grid-cols-lgGrid text-gray-500 text-sm xl:text-base gap-2'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <div className='py-3'>
        <HrLine />
      </div>
      <div className='pb-20'>
        {foodList.map(item => {
          const { _id, name, image, price } = item;
          if (cartItems[_id] > 0) {
            return (
              <>
                <div className='grid grid-cols-lgGrid text-sm xl:text-base items-center gap-2' key={_id}>
                  <div className='w-12'><img src={`${SERVER_URI}/images/${image}`} alt="food_item_img" className='rounded-md max-msm:w-10' /></div>
                  <p>{name}</p>
                  <p>{price}</p>
                  <p>{cartItems[_id]}</p>
                  <p>{cartItems[_id] * price}</p>
                  <div className='w-4 p-[2px] cursor-pointer' onClick={() => removeFromCart(_id)}><img src={cross_icon} alt="cross_icon" /></div>
                </div>
                <div className='py-2'>
                  <HrLine />
                </div>
              </>
            )
          }
        })}
      </div>
      <div className='flex flex-col items-center md:items-start md:flex-row gap-12 lg:gap-16 text-sm xl:text-base'>
        <div className='w-full msm:w-3/4 md:w-2/4 flex flex-col gap-4'>
          <p className='font-bold text-xl xl:text-2xl'>Cart Totals</p>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-4 justify-between'><p className='text-gray-500'>Subtotal</p><p className='text-gray-500'>${totalAmount ? totalAmount : 0}</p></div>
            <HrLine />
            <div className='flex gap-4 justify-between'><p className='text-gray-500'>Delivery Fee</p><p className='text-gray-500'>${totalAmount ? 2 : 0}</p></div>
            <HrLine />
            <div className='flex gap-4 justify-between'><p className='font-semibold'>Total</p><p>${totalAmount ? totalAmount + 2 : 0}</p></div>
          </div>
          <button className='bg-primary py-2 xl:py-3 px-4 xl:px-6 w-fit text-white rounded-[4px]' onClick={() => navigate('/checkout')}>Proceed To Checkout</button>
        </div>
        <div className='flex flex-col gap-2 w-full msm:w-3/4 md:w-2/4 text-sm xl:text-base items-center'>
          <p>If you have a promo code. Enter it here.</p>
          <div className='bg-[#e9e9e9] w-fit rounded-md flex items-center'>
            <input type="text" placeholder='Promo-code' className='bg-transparent py-3 outline-none px-2 lg:w-64' />
            <button className='bg-black py-3 px-10 rounded-md text-white'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart