import React from 'react'
import { useSelector } from 'react-redux'
import RenderCourseCard from './RenderCourseCard';
import RenderPriceCard from './RenderPriceCard';

const Card = () => {

    const {total,totalItems} = useSelector((state)=>state.cart);

    console.log("Printing the total Items : ",totalItems);
  return (
    <div className=' bg-richblack-700 pb-10 min-h-screen pt-8 px-36'>
        <div className=' mb-14 text-3xl font-medium text-richblack-5'> Your Cart</div>

        <div className=' w-full mx-auto border-b border-b-richblack-100 pb-2 text-richblack-100 mb-10'>{totalItems} Courses in Cart</div>

        <div className=' w-full gap-5'>

            {/* Left Container */}
            {
                total>0?(
                    <div className=' w-full flex gap-5  justify-between '>
                        <div className=' w-[65%]'> <RenderCourseCard/> </div>
                        <div className=' w-[30%]'> <RenderPriceCard/></div>
                    </div>
                ):(
                    <div className=' text-richblack-400 '>The cart is empty</div>
                )
            }
        </div>
    </div>
  )
}

export default Card