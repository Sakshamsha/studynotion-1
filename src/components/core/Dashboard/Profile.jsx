import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {FaEdit} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();

  return (
    <div className=' bg-richblack-700 w-full pb-20 '>
      <div className=' text-3xl pt-7 text-richblack-5 ml-32'>My Profile</div>

      <div className=' border-[0.5px] border-richblack-600 rounded-md bg-richblack-800 w-[80%] mx-auto mt-10 flex items-center justify-between p-9'>
        <div className=' flex gap-3 items-center'>
          <img src={user.image} className=' rounded-full' width={70}/>
          <div className=' flex flex-col'>
            <div className=' text-richblack-5 text-1xl font-bold'>{user.firstName} {user.lastName}</div>
            <div className='text-richblack-5 text-1xl font-bold'>{user.email}</div>
          </div>
        </div>

        <div>
            <button onClick={()=>navigate("/dashboard/settings")}
             className=' bg-yellow-50 py-2 px-6 rounded-md'>
              <div className=' flex items-center gap-2'>
                <p>Edit</p>
                <FaEdit/>
              </div>
            </button>
        </div>
      </div>

      <div className=' border-[0.5px] border-richblack-600 rounded-md bg-richblack-800 w-[80%] mx-auto mt-10 flex items-center justify-between p-9'>
        <div className=' flex flex-col gap-10 '>
          <div className=' text-[18px] font-bold text-richblack-5'>About</div>
          <div className=' text-richblack-300 text-sm'>Write Something about yourself</div>
          <div className=' text-[18px] text-richblack-5'> Account Type : <span className=' font-bold'>{user.accountType}</span></div>
        </div>

        <div>
            <button onClick={()=>navigate("/dashboard/settings")}
             className=' bg-yellow-50 py-2 px-6 rounded-md'>
              <div className=' flex items-center gap-2'>
                <p>Edit</p>
                <FaEdit/>
              </div>
            </button>
        </div>
      </div>
      
      <div className=' border-[0.5px] border-richblack-600 rounded-md bg-richblack-800 w-[80%] mx-auto mt-10 flex pb-10 justify-between p-9'>
        <div className=' flex flex-col gap-10 '>
          <div className=' text-[18px] font-bold text-richblack-5'>Personal Details</div>
          <div className=' flex flex-row gap-40'>

            <div className=' flex flex-col gap-4'>
              <div className=' flex flex-col gap-2'>
                <div className=' text-sm text-richblack-500'>First Name</div>
                <div className=' text-sm text-richblack-25'>{user.firstName}</div>
              </div>
              <div className=' flex flex-col gap-2'>
                <div className=' text-sm text-richblack-500'>Email</div>
                <div className=' text-sm text-richblack-25'>{user.email}</div>
              </div>
              <div className=' flex flex-col gap-2'>
                <div className=' text-sm text-richblack-500'>Gender</div>
                <div className=' text-sm text-richblack-25'>
                  {
                    user.additionalDetails?.gender === null?"Add gender":`${user.additionalDetails.gender}`
                  }
                </div>
              </div>
            </div>

            <div  className=' flex flex-col gap-4'>
              <div className=' flex flex-col gap-2'>
                <div className=' text-sm text-richblack-500'>Last Name</div>
                <div className=' text-sm text-richblack-25'>{user.lastName}</div>
              </div>
              <div className=' flex flex-col gap-2'>
                <div className=' text-sm text-richblack-500' >Phone Number</div>
                <div  className=' text-sm text-richblack-25'>
                  {
                    user?.additionalDetails?.contactNumber === null?"Add Contact number":`${user.additionalDetails.contactNumber}`
                  }
                </div>
              </div>
              <div className=' flex flex-col gap-2'>
                <div className=' text-sm text-richblack-500'>Date of Birth</div>
                <div  className=' text-sm text-richblack-25'>
                  {
                    user?.additionalDetails?.dateOfBirth === null?"January 1, 1970":`${user.additionalDetails.dateOfBirth}`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
            <button onClick={()=>navigate("/dashboard/settings")}
             className=' bg-yellow-50 py-2 px-6 rounded-md'>
              <div className=' flex items-center gap-2'>
                <p>Edit</p>
                <FaEdit/>
              </div>
            </button>
        </div>
      </div>


    </div>
  )
}

export default Profile