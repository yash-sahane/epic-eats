import React, { useState } from 'react'
import HrLine from '../components/HrLine'
import { useStoreContext } from '../context/StoreContext'
import toast from 'react-hot-toast';
import axios from 'axios';
import { SERVER_URI } from '../main';

const Checkout = () => {
  const { getTotalAmount, foodList, token, cartItems } = useStoreContext();
  const totalAmount = getTotalAmount();
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const submitHandler = async () => {
    const errors = {};
    if (!formData.fname.trim()) {
      errors.fname = 'First Name is required';
    }
    if (!formData.lname.trim()) {
      errors.lname = 'Last Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.street.trim()) {
      errors.street = 'Street is required';
    }
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      errors.state = 'State is required';
    }
    if (!formData.zip.trim()) {
      errors.zip = 'Zip is required';
    }
    if (!formData.country.trim()) {
      errors.country = 'Country is required';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Contact number is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length) {
      return;
    }

    let orderItems = [];
    foodList.map(item => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: formData,
      items: orderItems,
      amount: getTotalAmount()
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${SERVER_URI}/api/order/place`, { orderData }, { headers: { token } });
      const { success, message, session_url } = response.data;
      if (success) {
        location.replace(session_url);
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e.response);
    }
    setIsLoading(false);
  }

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
                  <div>
                    <input type="text" className='input' placeholder='First name' name='fname' value={formData.fname} onChange={onChangeHandler} />
                    {errors.fname && <p className='ml-2 text-sm text-primary'>{errors.fname}</p>}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div>
                    <input type="text" className='input' placeholder='Last name' name='lname' value={formData.lname} onChange={onChangeHandler} />
                    {errors.lname && <p className='ml-2 text-sm text-primary'>{errors.lname}</p>}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <input type="text" className='input' placeholder='Email address' name='email' value={formData.email} onChange={onChangeHandler} />
                  {errors.email && <p className='ml-2 text-sm text-primary'>{errors.email}</p>}
                </div>
              </div>
              <div>
                <div>
                  <input type="text" className='input' placeholder='Street' name='street' value={formData.street} onChange={onChangeHandler} />
                  {errors.street && <p className='ml-2 text-sm text-primary'>{errors.street}</p>}
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='w-2/4'>
                  <div>
                    <input type="text" className='input' placeholder='City' name='city' value={formData.city} onChange={onChangeHandler} />
                    {errors.city && <p className='ml-2 text-sm text-primary'>{errors.city}</p>}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div>
                    <input type="text" className='input' placeholder='State' name='state' value={formData.state} onChange={onChangeHandler} />
                    {errors.state && <p className='ml-2 text-sm text-primary'>{errors.state}</p>}
                  </div>
                </div>
              </div>
              <div className='flex gap-3'>
                <div className='w-2/4'>
                  <div>
                    <input type="number" className='input' placeholder='Zip code' name='zip' value={formData.zip} onChange={onChangeHandler} />
                    {errors.zip && <p className='ml-2 text-sm text-primary'>{errors.zip}</p>}
                  </div>
                </div>
                <div className='w-2/4'>
                  <div>
                    <input type="text" className='input' placeholder='Country' name='country' value={formData.country} onChange={onChangeHandler} />
                    {errors.country && <p className='ml-2 text-sm text-primary'>{errors.country}</p>}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <input type="number" className='input' placeholder='Contact Number' name='phone' value={formData.phone} onChange={onChangeHandler} />
                  {errors.phone && <p className='ml-2 text-sm text-primary'>{errors.phone}</p>}
                </div>
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
          <div className='flex gap-2 items-center'><button className='bg-primary py-2 xl:py-3 px-4 xl:px-6 w-fit text-white rounded-[4px]' onClick={submitHandler}>Proceed To Checkout</button>
            {isLoading && <div className='spinner'></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout