import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import toast from 'react-hot-toast';
import { SERVER_URI } from '../main';
import { useStoreContext } from '../context/StoreContext';

const Add = () => {
  const { upload_area } = assets;
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: '',
    category: 'Salad'
  })
  const [errors, setErrors] = useState({});
  const { token } = useStoreContext();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { name, description, price, category } = data;

      const errors = {};
      if (!name.trim()) {
        errors.title = 'Title is required';
      }
      if (!description.trim()) {
        errors.description = 'Description is required';
      }
      if (!price.trim()) {
        errors.price = 'Price is required';
      }
      if (!category.trim()) {
        errors.category = 'Category is required';
      }
      if (!image) {
        errors.image = 'Image is required';
      }
      setErrors(errors);

      if (Object.keys(errors).length) {
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('image', image);

      const response = await axios.post(`${SERVER_URI}/api/food/add`, formData, {
        headers: { token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad'
        });
        setImage(null);
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e.response);
    }
  }

  return (
    <div className='mt-28'>
      <form onSubmit={submitHandler} className='mt-14 ml-8 flex flex-col gap-4 text-sm'>
        <div className='flex flex-col gap-2'>
          <p className='text-gray-500'>Upload Image</p>
          <label htmlFor='product_image' className='w-32'>
            <img src={image ? URL.createObjectURL(image) : upload_area} alt="upload_area" className='w-full' />
          </label>
          {errors.image && <p className='ml-2 text-sm text-primary'>{errors.image}</p>}
          <input type="file"
            accept='image/*'
            id='product_image'
            // name='product_image'
            hidden

            onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-gray-500'>Product Name</p>
          <input type="text" className='input' name='name' value={data.name} onChange={onChangeHandler} />
          {errors.title && <p className='ml-2 text-sm text-primary'>{errors.title}</p>}
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-gray-500'>Product Description</p>
          <textarea rows={5} className='input resize-none' name='description' value={data.description} onChange={onChangeHandler}></textarea>
          {errors.description && <p className='ml-2 text-sm text-primary'>{errors.description}</p>}
        </div>
        <div className='flex gap-8'>
          <div className='flex flex-col gap-2'>
            <p className='text-gray-500'>Product Category</p>
            <select className='input' name='category' onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodle">Noodles</option>
            </select>
            {errors.category && <p className='ml-2 text-sm text-primary'>{errors.category}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-gray-500'>Product Price</p>
            <input type="number" className='input' name='price' onChange={onChangeHandler} value={data.price} />
            {errors.price && <p className='ml-2 text-sm text-primary'>{errors.price}</p>}
          </div>
        </div>
        <div>
          <button className='bg-black text-white py-2 px-10' type='submit'>ADD</button>
        </div>
      </form>
    </div>
  )
}

export default Add