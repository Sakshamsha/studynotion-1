import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operations/profileApi';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import InstructorChart from './InstructorChart';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {

    const {token} = useSelector((state)=>state.auth);
    const [instructorData,setInstructorData] = useState(null);
    const [courses,setCourses] = useState(null);
    const navigate = useNavigate();

    const {user} = useSelector((state)=>state.profile);
    useEffect(()=>{
        const getInstructorStat = async()=>{
            const response = await getInstructorData(token);
            console.log("Printing the response in Instructor DashBoard : ",response);
            setInstructorData(response);

            const anotherResponse = await fetchInstructorCourses(token);
            console.log("Printing the anotherResponse in Instructor Dashboard : ",anotherResponse);
            setCourses(anotherResponse);
        }


        getInstructorStat();


    },[])

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
      )
    
      const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
      )


  return (
    <div className=' bg-richblack-800 min-h-screen px-40 pb-10'>

        <div className=' pt-10'>
            <p className=' text-white text-2xl font-bold'>Hi {user?.firstName} 👋</p>
            <p className=' text-richblack-400 mt-3'>Let's start something new</p>
        </div>

        <div className=' flex mt-5 w-full gap-5 h-[500px]'>
            {
                (totalAmount >0 || totalStudents>0 )?
                <div className=' w-[69%] bg-richblack-900 rounded-md'><InstructorChart courses={instructorData}/></div>
                :<div className=' w-[69%] bg-richblack-900 rounded-md'>
                    <p>Visualise</p>
                    <p>Not have enough data to Visualise</p>
                </div>
            }

            <div className='w-[29%] bg-richblack-900 rounded-md flex flex-col gap-4 p-5'>
                <p className=' text-xl text-richblack-5 font-bold'>Statistics</p>
                <div className=' flex flex-col gap-1'>
                    <p className=' text-richblack-300 text-[21px]'>Total Courses</p>
                    <p className=' text-richblack-25 text-2xl font-bold'>{courses?.length}</p>
                </div>

                <div className=' flex flex-col gap-1'>
                    <p className=' text-richblack-300 text-[21px]'>Total Students</p>
                    <p className=' text-richblack-25 text-2xl font-bold'>{totalStudents}</p>
                </div>

                <div className=' flex flex-col gap-1'>
                    <p className=' text-richblack-300 text-[21px]'>Total Income</p>
                    <p className=' text-richblack-25 text-2xl font-bold'>{totalAmount}</p>
                </div>
            </div>
        </div>

        <div className=' bg-richblack-900 p-7 rounded-md mt-3'>
            <div className=' flex justify-between mb-4'>
                <p className=' text-xl text-richblack-5 font-bold'>Your Courses</p>
                <p className=' text-yellow-50 cursor-pointer text-sm font-bold'
                onClick={()=>navigate("/dashboard/my-courses")}>View All</p>
            </div>

            <div className=' flex gap-5'>
                {
                    courses?.slice(0,3).map((course)=>{
                        return <div>
                            <img src={course.thumbnail} className='h-[201px] w-[300px] rounded-md object-cover'/>
                            <p className='text-richblack-5 text-sm mt-3 '>{course.courseName}</p>

                            <div className=' flex gap-2 mt-2'>
                                <p className=' text-richblack-300 text-xs '>{course.studentsEnrolled.length} Students</p>

                                <p className='text-richblack-300 text-xs '>|</p>

                                <p className='text-richblack-300 text-xs '>Rs. {course.price}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default InstructorDashboard