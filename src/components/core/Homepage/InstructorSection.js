import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import CTAButton from "./Button"
import {FaArrowRight} from "react-icons/fa"
import HighlightText from './HighlightText'


const InstructorSection = () => {
  return (
    <div className=' w-[100%] '>
        <div className=' w-11/12 max-w-maxContent mx-auto mt-11 flex flow-row pt-20 gap-20'>
            
            {/* Left Part */}
            <div className=''>
                <img src={instructor} className=' shadow-[-20px_-20px_rgba(255,255,255)]'/>
            </div>

            {/* Right Part */}
            <div className=' flex flex-col justify-center '>
                <div className=' text-4xl text-richblack-5 font-semibold'>Become an</div>
                <div className=' text-4xl font-semibold'> <HighlightText text={"instructor"}/></div>
                <div className=' text-richblack-300 mt-10 tracking-wider'>Instructors from around the world teach millions of students on</div>
                <div className=' text-richblack-300'>StudyNotion. We provide the tools and skills to teach what you love.</div>

                <div className=' mt-10 w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className=' flex flow-row items-center gap-2 '>
                            <p>Start Teaching Today</p>
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection