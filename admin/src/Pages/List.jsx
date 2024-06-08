import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URI } from '../main';
import { assets } from '../assets/assets';
import HrLine from '../components/HrLine';
import toast from 'react-hot-toast';
import { useStoreContext } from '../context/StoreContext';

const List = () => {
  const [list, setList] = useState([]);
  const { cross_icon } = assets;
  const { token } = useStoreContext();

  const getFoodList = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URI}/api/food/list`);
      setList(data.data);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e.response);
    }
  }

  const removeFoodItem = async (id) => {
    try {
      const { data } = await axios.post(`${SERVER_URI}/api/food/remove`, {
        id
      }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
      }
      getFoodList();
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e.response);
    }
  }

  useEffect(() => {
    getFoodList();
  }, []);

  return (
    <div className=' mt-28 flex-1'>
      <div className='ml-8 mt-14'>
        <div className='grid grid-cols-lgGrid max-msm:grid-cols-smlgGrid text-gray-500 text-sm xl:text-base gap-2 font-semibold'>
          <p>Image</p>
          <p>Title</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        <div className='py-3'>
          <HrLine />
        </div>
        <div className='text-gray-500 text-sm xl:text-base font-semibold'>
          {!list.length && <p className='mt-8 mx-auto'>Please add something to manage here</p>}
        </div>
        <div className='pb-20'>
          {list?.map(item => {
            const { _id, name, image, price, category } = item;
            return (
              <div key={_id}>
                <div className='grid grid-cols-lgGrid max-msm:grid-cols-smlgGrid text-sm xl:text-base items-center gap-2' key={_id}>
                  <div className='w-12'><img src={`${SERVER_URI}/images/${image}`} alt="food_item_img" className='rounded-md max-msm:w-10' /></div>
                  <p>{name}</p>
                  <p>{category}</p>
                  <p>{price}</p>
                  <div className='w-4 p-[2px] cursor-pointer'><img src={cross_icon} alt="cross_icon" onClick={() => removeFoodItem(_id)} /></div>
                </div>
                <div className='py-2'>
                  <HrLine />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default List