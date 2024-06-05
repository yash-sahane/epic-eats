import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URI } from '../main';
import { useStoreContext } from '../context/StoreContext';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useStoreContext();
  const { parcel_icon } = assets;
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.post(`${SERVER_URI}/api/order/orders`, {}, { headers: { token } });
      if (data.success) {
        setOrders(data.orderData);
      }
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='max-container paddingx py-24 pt-48'>
      <div className='mb-4'><p className='text-lg font-bold xl:text-xl'>My Orders</p></div>
      <div className='flex flex-col gap-4'>
        {orders?.map(order => {
          return <React.Fragment key={order._id}>
            <div className='grid grid-cols-xlGrid max-sm:grid-cols-smGrid text-sm xl:text-base items-center py-4 gap-4 border border-gray-300 text-gray-600 px-4'>
              <div className='w-12'><img src={parcel_icon} alt="food_item_img" className='rounded-md max-msm:w-10' /></div>
              <div className='flex flex-wrap gap-1'>{order?.items?.map((item, idx) => {
                if (idx === order.items.length - 1) {
                  return <p key={item._id}>{`${item.name} x ${item.quantity}`}</p>
                } else {
                  return <p key={item._id}>{`${item.name} x ${item.quantity}, `}</p>
                }
              })}</div>
              <p>${order.amount}.00</p>
              <p>Items : {order.items.length}</p>
              <div>
                <p><span className={`${order.status === 'Delivered' ? 'text-green-500' : 'text-primary'} `}>&#x25cf;</span> {order.status}</p>
              </div>
              <button className='bg-[#f9e0df] py-[10px] px-2' onClick={fetchOrders}><p>Track Order</p></button>
            </div>
          </React.Fragment>
        })}
        {orders.length <= 0 && <div><p className='text-md'>No orders available. Continue your shopping <span onClick={() => navigate('/')} className='font-semibold text-primary underline-after cursor-pointer'>here</span></p></div>}
      </div>
    </div>
  )
}

export default Orders