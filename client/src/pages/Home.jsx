import React, { useState } from 'react'
import Hero from '../components/Hero'
import { menu_list } from '../assets/assets'
import ExploreMenu from '../components/ExploreMenu';
import HrLine from '../components/HrLine';
import FoodItems from '../components/FoodItems';
import MobileApp from '../components/MobileApp';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div>
      <div className='max-container paddingx pt-[7.1rem]' id='home'>
        <Hero />
        <ExploreMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className='pt-12 md:pt-16 pb-8'>
          <HrLine />
        </div>
        <FoodItems selectedCategory={selectedCategory} />
        <MobileApp />
      </div>
    </div>
  )
}

export default Home