import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStoreContext } from '../context/StoreContext';
import axios from 'axios';
import { SERVER_URI } from '../main';
import toast from 'react-hot-toast';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  const { token } = useStoreContext();

  const verifyPayment = async (token) => {
    try {
      const { data } = await axios.post(`${SERVER_URI}/api/order/verify`, { success, orderId }, {
        headers: { token }
      })
      if (data.success) {
        navigate('/orders');
        toast.success(data.message);
      } else {
        toast.error(data.message);
        navigate('/');
      }
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      verifyPayment(token);
    }
  }, [token])

  return (
    <div className='spinner large-spinner'></div>
  )
}

export default Verify