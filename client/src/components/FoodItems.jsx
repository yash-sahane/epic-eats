import FoodItem from './FoodItem';
import { useStoreContext } from '../context/StoreContext';

const FoodItems = ({ selectedCategory }) => {
  const { foodList } = useStoreContext();

  return (
    <div>
      <p className='text-2xl md:text-3xl font-bold'>Top dishes near you</p>
      <div className='py-8'>
        <div className='grid grid-cols-card4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center'>
          {foodList.map(foodItem => {
            if (selectedCategory === 'All' || selectedCategory === foodItem.category) {
              return <FoodItem foodItem={foodItem} key={foodItem._id} />
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default FoodItems