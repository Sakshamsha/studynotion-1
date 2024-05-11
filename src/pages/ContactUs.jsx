import React from 'react'
import {BsFillChatFill} from "react-icons/bs"
import {FaGlobeAmericas} from "react-icons/fa"
import {FcCallback} from "react-icons/fc"
import ContactForm2 from "../components/core/ContactPage/ContactForm2"
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'

const ContactUs = () => {
  return (
    <div className=' w-full bg-richblack-900'>
        <div className=' w-11/12 max-w-maxContent mx-auto flex flex-row mt-36 justify-between '>
            <div className=' bg-richblack-800 w-[490px] p-10 flex flex-col gap-10 h-[400px] rounded-lg '>
                {/* First */}
                <div className=' flex flex-col gap-2'>
                    <div className=' flex flow-row items-center gap-3'>
                        <BsFillChatFill color='grey' fontSize={20 }/>
                        <div className=' text-richblack-5 font-semibold text-[18px]'>Chat on us</div>
                    </div>
                    <div className=' text-richblack-200 text-[15px] pr-[29px] '>
                        Our friendly team is here to help. <span className=' font-bold '>info@studynotion.com</span>
                    </div>
                </div>

                {/* Second */}
                <div className=' flex flex-col gap-2'>
                    <div className='flex flow-row items-center gap-3'>
                        <FaGlobeAmericas color='grey' fontSize={20}/>
                        <div className=' text-richblack-5 font-semibold text-[18px]'>Visit us</div>
                    </div>
                    <div className=' text-richblack-200 text-[15px]   '>
                        <div>Come and say hello at our office HQ.</div>
                        <span className=' font-bold  '>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</span>
                    </div>
                </div>

                {/* Third */}
                <div className=' flex flex-col gap-2'>
                    <div className='flex flow-row items-center gap-3'>
                        <FcCallback  fontSize={20}/>
                        <div className=' text-richblack-5 font-semibold text-[18px]'>Call us</div>
                    </div>

                    <div  className='text-richblack-200 text-[15px]'  >
                        <div>Mon - Fri From 8am to 5pm</div>
                        <div className=' font-bold  '>+123 456 7869</div>
                    </div>
                </div>
            </div>

            <div className=' border-[0.5px] border-richblack-600 p-14 w-[720px] rounded-lg'>
                <div className=' text-4xl  text-richblack-5 font-semibold pr-10'>Got a Idea? We've got the skills. Let's team up</div>
                <div className=' text-richblack-300 mt-5'>Tell us more about yourself and what you're got in mind.</div>
                <ContactForm2/>
            </div>


        </div>

        <div className=' w-11/12 max-w-maxContent mx-auto mt-20 '>
            <div className=' text-4xl text-richblack-5 font-semibold text-center'>Reviews from other learners</div>
            <ReviewSlider/>
        </div>

        <Footer/>
    </div>
  )
}

export default ContactUs