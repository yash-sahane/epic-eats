import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { useStoreContext } from '../context/StoreContext';
import { SERVER_URI } from '../main';

const FoodItem = ({ foodItem }) => {
  const { _id, name, image, price, description, category } = foodItem;
  const { rating_starts, add_icon_white, add_icon_green, remove_icon_red } = assets;
  const { token, cartItems, addToCart, removeFromCart } = useStoreContext();

  return (
    <div className='flex flex-col shadow-3xl rounded-2xl overflow-hidden animate-fade-in hover:-translate-y-2 transition-transform duration-150 ease-in-out'>
      <div className='relative'>
        <img src={`${SERVER_URI}/images/${image}`} alt="foot_item_img" />
        {token && <div className='absolute right-4 bottom-4'>
          {!cartItems[_id] ? <button className='w-10' onClick={() => addToCart(_id)}><img src={add_icon_white} alt="add_icon_btn" /></button> :
            <div className='bg-white p-1 rounded-full flex items-center gap-3 w-fit'>
              <button><img src={remove_icon_red} alt="remove_icon_red" onClick={() => removeFromCart(_id)} /></button>
              <p>{cartItems[_id]}</p>
              <button onClick={() => addToCart(_id)} ><img src={add_icon_green} alt="add_icon_green" /></button>
            </div>}
        </div>}
      </div>
      <div className='px-4 pt-6 pb-6 flex flex-col gap-4 '>
        <div className='flex gap-4 justify-between items-center'><p className='font-bold md:text-lg xl:text-[22px] xl:leading-8 w-2/4'>{name}</p>
          <div className='w-2/4 flex justify-end'><img src={rating_starts} alt="rating_icon" />
          </div>
        </div>
        <p className='text-text-gray text-sm xl:text-base'>{description}</p>
        <p className='text-lg font-bold text-primary'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem