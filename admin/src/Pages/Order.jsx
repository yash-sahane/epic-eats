import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { SERVER_URI } from '../main';
import { useEffect } from 'react';
import { assets } from '../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { parcel_icon } = assets;

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URI}/api/order/list`);
      setOrders(data.orderData);
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message);
    }
  }

  const statusUpdateHandler = async (value, orderId) => {
    try {
      const { data } = await axios.post(`${SERVER_URI}/api/order/status`, { status: value, orderId });

      if (data.success) {
        toast.success(data.message);
        fetchAllOrders();
      }
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='max-container paddingx py-24 pt-48'>
      <div className='mb-4'><p className='text-lg font-bold xl:text-xl'>My Orders</p></div>
      <div className='flex flex-col gap-4'>
        {orders?.map(order => {
          return <React.Fragment key={order._id}>
            <div className='grid grid-cols-orderXsGrid msm:grid-cols-orderSmGrid md:grid-cols-orderLgGrid text-sm xl:text-base items-center py-4 gap-4 border border-gray-300 text-gray-600 px-4'>
              <div className='w-12'><img src={parcel_icon} alt="food_item_img" className='rounded-md max-msm:w-10' /></div>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-wrap gap-1 font-semibold'>{order?.items?.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return <p key={item._id}>{`${item.name} x ${item.quantity}`}</p>
                  } else {
                    return <p key={item._id}>{`${item.name} x ${item.quantity}, `}</p>
                  }
                })}
                </div>
                <div>
                  <p className='font-semibold'>{`${order.address.fname} ${order.address.lname}${', '}`}</p>
                  <p>{`${order.address.city}${', '} ${order.address.state}${', '} ${order.address.country}${', '} ${order.address.zip} `}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <p>${order.amount}.00</p>
              <p>Items : {order.items.length}</p>
              <div>
                <select name="status" id="status" value={order.status} className='bg-[#f9e0df] outline-none border border-primary py-2 px-2' onChange={(e) => statusUpdateHandler(e.target.value, order._id)}>
                  <option value='Pending'>Pending</option>
                  <option value='Processing'>Processing</option>
                  <option value='Completed'>Completed</option>
                  <option value='Dispatch'>Dispatch</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </div>
            </div>
            {/* <HrLine /> */}
          </React.Fragment>
        })}
      </div>
    </div>
  )
}

export default Order