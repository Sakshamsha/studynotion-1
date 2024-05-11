import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {BiLeftArrowAlt} from "react-icons/bi"
import { getPasswordResetToken } from '../services/operations/authApi';

const ForgotPassword = () => {

    const {loading} = useSelector((state)=>state.auth);
    const [email,setEmail] = useState("");
    const [emailSent,setEmailSent] = useState(false);
    const dispatch = useDispatch();

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
    
  return (
    <div className=' bg-richblack-900 w-full h-screen flex justify-center items-center'>

        {
            loading?(<div className='spinner'>
                Loading...
            </div>):(
                <div className=' max-w-[500px]'>
                    <div className=' text-4xl text-white font-bold '>
                        {
                            !emailSent?("Reset Password"):("Check email")
                        }
                    </div>

                    <div className=' text-[20px] font-bold text-richblack-200 mt-5 w-[87%]'>
                        {
                            !emailSent?(" Have no fear. We’ll email you instructions to reset your password.If you dont have access to your email we can try account recovery"):
                            (`We have sent the reset email to your ${email}`)
                        }
                    </div>

                    {
                        !emailSent && (
                            <form className=' mt-5' >
                                <label>
                                    <p className=' text-richblack-5 text-[14px]'>
                                        Email Address <sup className=' text-[#EF476F] ml-0'>*</sup>
                                    </p>

                                    <input
                                        required
                                        type='email'
                                        value={email}
                                        name='email'
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder='Enter email address'
                                        className=' bg-richblack-800 mt-1 w-[430px] h-[50px] rounded-lg input border-b-[1px] border-richblack-5
                                         text-richblack-5'
                                    />
                                </label>
                            </form>
                        )
                    }

                    <div className=' mt-5'>
                        <button className=' bg-yellow-50 w-[430px] h-[50px] rounded-lg' onClick={handleOnSubmit} >
                            {
                                !emailSent?("Reset Password"):("Resend email")

                            }
                        </button>
                    </div>

                    <div className=' flex flex-row mt-5'>
                        <Link to={"/login"}>
                            <div className=' flex flex-row items-center gap-3'>
                                <BiLeftArrowAlt color='white'/>
                                <p className=' text-[17px] text-richblack-5'>Back to login</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        }

    </div>
  )
}

export default ForgotPassword