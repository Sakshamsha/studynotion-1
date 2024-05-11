import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/apis';
import toast from 'react-hot-toast';

const ContactForm = () => {

    const [loading,setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data)=>{
        
        console.log("Logging data : ",data);
        try {

            setLoading(true);
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
              )
              toast.success("Email Sent Successfully");
            console.log("Printing the res : ",res);
            setLoading(false);

        } catch (error) {
            console.log("Error: ",error.message);
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset,isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className=' flex flex-col items-center'>
        <div className=' flex flex-col gap-8'>

            <div className=' flex gap-5'>

                {/* First Name */}
                <div className=' flex flex-col'>
                    <label htmlFor='firstName' className=' text-[14px] text-richblack-5'>First Name <sup className=' text-[#EF476F]'>*</sup></label>
                    <input
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        className=' text-richblack-5 bg-richblack-700 px-3 py-3 rounded-md mt-3 border-b-[1px] border-richblack-200'
                        type='text'
                        {...register("firstName",{required:true})}
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please Enter Your Name
                            </span>
                        )
                    }
                </div>

                {/* Last Name */}
                <div className=' flex flex-col'>
                    <label htmlFor='lastName' className=' text-[14px] text-richblack-5'>Last Name</label>
                    <input
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        className=' text-richblack-5 bg-richblack-700 px-3 py-3 rounded-md mt-3 border-b-[1px] border-richblack-200'
                        type='text'
                        {...register("lastName")}
                    />
                    
                </div>

            </div>

            {/* Email */}
            <div className=' flex flex-col'>
                <label htmlFor='email' className=' text-[14px] text-richblack-5'>Email<sup className=' text-[#EF476F]'>*</sup></label>
                <input
                    name='email'
                    id='email'
                    placeholder='Enter Email Address'
                    className='text-richblack-5 bg-richblack-700 px-3 py-3 rounded-md mt-3 border-b-[1px] border-richblack-200'
                    type='email'
                    {...register("email",{required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please Enter Your Email Address
                        </span>
                    )
                }
            </div>

            {/* Phone Number */}
            <div className='flex flex-col'>

                <label htmlFor='phonenumber' className=' text-[14px] text-richblack-5'>Phone Number<sup className=' text-[#EF476F]'>*</sup></label>

                <div className='flex flex-row gap-3'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown"
                            className='text-richblack-5 bg-richblack-700 px-3 py-3 rounded-md mt-3 border-b-[1px] border-richblack-200 w-[80px]'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-richblack-5 bg-richblack-700 px-3 py-3 rounded-md mt-3 border-b-[1px] border-richblack-200  w-[calc(100%-90px)]'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message' className=' text-[14px] text-richblack-5'>Message<sup className=' text-[#EF476F]'>*</sup></label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='text-richblack-5 bg-richblack-700 px-3 py-3 rounded-md mt-3 border-b-[1px] border-richblack-200'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>

            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black py-3'>
                        Send Message
            </button>

        </div>
    </form>
  )
}



export default ContactForm

