import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiconnector';
import {ratingsAverageEndpoints} from "../.././././../services/apis"
// import ReactStars from "react-rating-stars-component";
import { removeFromCart } from '../../../slices/cartSlice';
import {RiDeleteBin6Fill} from "react-icons/ri"

const RenderCourseCard = () => {

    // const {GET_AVERAGE_RATING} = ratingsAverageEndpoints;

    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    var rating = 0;

    // const handleAverage = async(id)=>{
    //     try {
    //         rating = await apiConnector("GET",GET_AVERAGE_RATING,id);

    //     } catch (error) {
    //         console.log("There is sime error in vcalculating Average rating",error);
    //     }
    // }


  return (
    <div className=' flex flex-col bg-richblue-900  gap-3'>
        {
            cart.map((course,index)=>{
                return <div key={index} className=' flex flex-row gap-5 p-5 rounded-md border-b-2 border-richblack-300'>

                    {/* First Div */}
                    <div>
                        <img src={course?.thumbnail} width={150} className=' aspect-square rounded-md'/>
                    </div>

                    {/* Second Div */}
                    <div className=' flex flex-col gap-3 '>
                        {/* {rating = handleAverage(course._id)} */}
                        <div className=' text-xl text-richblack-5'>{course.courseName}</div>
                        <div className=' text-richblack-200'>{course?.category?.name}</div>
                        <div className=' flex gap-2 text-richblack-200'>
                            <div>{rating}</div>

                            <div>
                                {/* <ReactStars
                                    count={5}
                                    edit={false}
                                    value={rating}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />, */}
                            </div>

                            <div>(Review Count)</div>

                        </div>

                        <div className=' text-richblack-200'>Total Courses . Lesson . Beginner</div>
                    </div>

                    {/* Third Div */}
                    <div className=' flex flex-col gap-3 ml-16'>
                        <button onClick={()=> dispatch(removeFromCart(course._id))} className=' bg-richblack-700 p-2 rounded-md flex gap-2 items-center'>
                            <RiDeleteBin6Fill className=' text-[#EF476F]'/>
                            <p className='text-[#EF476F] '>Remove</p>
                        </button>
                        <p className=' text-2xl text-yellow-50'>Rs. {course.price}</p>
                    </div>

                </div>
            })
        }
    </div>
  )
}

export default RenderCourseCard