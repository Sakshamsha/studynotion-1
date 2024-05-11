import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../services/operations/studentFeatureAPI';
import { useNavigate } from 'react-router-dom';



const RenderPriceCard = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {

      console.log("Now the handle buy course in render Price cart : ");
        const courses = cart.map((course) => course._id);
        // console.log("Bought these course:", courses);
        //TODO: API integrate -> payment gateway tak leke jaegi

        buyCourse(token, courses, user, navigate, dispatch)
    }

  return (
    <div className=' bg-richblack-900 p-7 flex flex-col gap-4 rounded-md'>

        <p className=' text-richblack-200'>Total:</p>
        <p className=' text-yellow-50 text-3xl font-semibold'>Rs {total}</p>

        <button onClick={() =>handleBuyCourse()} className=' bg-yellow-50 p-3 text-richblue-900 font-bold rounded-md'>Buy Now</button>
        
    </div>
  )
}

export default RenderPriceCard