import React from 'react'
import { assets } from '../assets/assets'

const MobileApp = () => {
  const { play_store, app_store } = assets;
  return (
    <div className='max-container' id='mobile-app'>
      <div className='flex flex-col gap-8 items-center pt-12 pb-16'>
        <p className='text-2xl md:text-3xl font-bold md:w-2/4 max-w-[30rem] text-center'>For Better Experience Download Epic Eats App</p>
        <div className='flex gap-2 msm:gap-8 flex-col msm:flex-row'>
          <div className='w-40 transition-all duration-150 ease-in-out hover:scale-105 cursor-pointer'><img src={play_store} alt="play_store" className='w-full' /></div>
          <div className='w-40 transition-all duration-150 ease-in-out hover:scale-105 cursor-pointer'><img src={app_store} alt="app_store" className='w-full' /></div>
        </div>
      </div>
    </div>
  )
}

export default MobileApp