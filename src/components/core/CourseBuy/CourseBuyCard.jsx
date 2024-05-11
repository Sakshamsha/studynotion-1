import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import copy from 'copy-to-clipboard'
import ConfirmationModal from "../Dashboard/ConfirmationModal"
import toast from 'react-hot-toast'
import { addToCart } from '../../../slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const CourseBuyCard = ({course,setConfirmationModal,handleBuyCourse}) => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    function handleShare(){
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    const handleAddToCart = () => {
        console.log("handleAddToCart funciton is called !!!");
        if (user && user?.accountType === "Instructor") {
          toast.error("You are an Instructor. You can't buy a course.")
          return
        }
        if (token) {
          dispatch(addToCart(course))
          return
        }
        setConfirmationModal({
          text1: "You are not logged in!",
          text2: "Please login to add To Cart",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2Handler: () => setConfirmationModal(null),
        })
      }

  return (
    <div className=' p-5 bg-richblack-700 absolute right-10 top-20 rounded-md'>

        <img src={course.thumbnail} width={350} className=' rounded-md'/>

        <div className=' text-richblack-5 mt-3 font-bold text-3xl pl-2'>Rs. {course.price}</div>

        <div>
        <button className=' w-full bg-yellow-50 py-2 font-bold mt-3 rounded-md hover:bg-yellow-100'
            onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
            }
        >
            {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"
            }
        </button>

    
        {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button  className=" w-[100%] bg-richblack-800 hover:bg-richblack-900  py-2 font-bold mt-3 rounded-md text-richblack-25"
            onClick={handleAddToCart}>
            Add to Cart
            </button>
        )}

        </div>

        <div className=' text-center mt-5 text-sm text-richblack-25'>30-Day Money-Back Guarantee</div>

        <div className={` mt-5`}>
            <p className={`my-2 text-xl font-semibold text-richblack-5 `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
        </div>

        <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
        </div>

        
    </div>
  )
}

export default CourseBuyCard