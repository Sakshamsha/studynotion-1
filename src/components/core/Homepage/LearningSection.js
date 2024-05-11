import React from 'react'
import HighlightText from './HighlightText'
import KnowYourProgress from "../../../assets/Images/Know_your_progress.png"
import CompareWithOthers from "../../../assets/Images/Compare_with_others.png"
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"

const LearningSection = () => {
  return (
    <div className=' mt-36'>
        <div className=' w-11/12 max-w-maxContent mx-auto flex flex-col items-center'>
            <div className=' text-4xl font-semibold text-center'>
                Your swiss knife for
                <HighlightText text={"learning any language"}/>
            </div>

            <div className=' text-center mt-3 text-richblack-900 w-[65%] '>
                Using spin making learning multiple languages easy.
                with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img 
                    src = {KnowYourProgress}
                    alt = "KNowYourProgressImage"
                    className='object-contain -mr-32 '
                />
                <img 
                    src = {CompareWithOthers}
                    alt = "Compare With Others"
                    className='object-contain'
                />
                <img 
                    src = {PlanYourLessons}
                    alt = "PlanYourLessons"
                    className='object-contain -ml-36'
                />
            </div>

            <div>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningSection