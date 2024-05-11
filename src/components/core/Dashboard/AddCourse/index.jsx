import React from 'react'
import {AiFillThunderbolt} from "react-icons/ai"
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='bg-richblack-700 w-full pb-20 min-h-screen '>
        <div className=' flex flex-col'>
            <div className=' text-3xl text-richblack-5 ml-36 mt-10'>Add a Course</div>
            <div className=' w-[50%]'>
                <RenderSteps/>
            </div>
        </div>
        <div className=' bg-richblack-900 text-richblack-25 fixed right-28 top-28 py-7 px-14 max-w-[400px] rounded-md border-[1px] border-richblack-600'>
            <div className=' ml-[-20px] flex gap-3 items-center'>
                <AiFillThunderbolt className=' text-yellow-100'/>
                <div className=' text-[18px]'>Course Upload Tips</div>
            </div>
            <div className=' text-xs mt-7'>
                <ul className=' list-disc flex flex-col gap-4'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AddCourse;