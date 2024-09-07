import { menu_list } from '../assets/assets'

const ExploreMenu = ({ selectedCategory, setSelectedCategory }) => {
  const categoryHandler = (menu_name) => {
    if (selectedCategory === menu_name) {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(menu_name);
    }
  }

  return (
    <div id='explore-menu'>
      <div className='flex flex-col gap-4 lg:w-2/4 py-8'>
        <p className='text-2xl md:text-3xl font-bold'>Explore our menu</p>
        <p className='font-medium'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      </div>
      <div className='flex justify-center'>
        <div className='flex gap-8 overflow-x-auto'>
          {menu_list.map(item => <div key={item.menu_name} className='flex flex-col gap-4 items-center' onClick={() => categoryHandler(item.menu_name)}>
            <div className='w-24 msm:w-28'>
              <img src={item.menu_image} alt="item_img" className={`transition-all duration-100 ease-in-out ${selectedCategory === item.menu_name && 'p-[2px] border-4 border-primary rounded-full'}`} />
            </div>
            <p className='font-medium'>{item.menu_name}</p>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default ExploreMenu