const Hero = () => {
  return (
    <div className=' msm:h-[35rem] py-8 msm:py-4 bg-hero bg-cover bg-center gap-4 rounded-3xl msm:rounded-[3rem]'>
      <div className='animate-slide-in h-full w-full md:w-3/4 xl:w-2/4 flex flex-col justify-center gap-4 msm:gap-6 paddingx overflow-hidden'>
        <p className='text-white text-2xl msm:text-4xl md:text-[4rem] md:leading-[5rem] font-semibold'>Order your favourite food here</p>
        <p className='text-white drop-shadow-md hidden msm:block'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button className='py-3 px-4 msm:py-4 msm:px-6 bg-white w-fit rounded-full'><p>View Menu</p></button>
      </div>
    </div>
  )
}

export default Hero