import React, { useEffect, useState } from 'react'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { BiLeftArrowAlt } from "react-icons/bi";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import VideoSideBar from '../components/core/ViewCourse/VideoSideBar';
import ReviewModal from '../components/common/ReviewModal';

const ViewCourse = () => {

    const {courseId,sectionId,subSectionId} = useParams();

    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [response,setResponse] = useState(null);
   
    const [reviewModal,setReviewModal] = useState(false);
    
    const getFullCourseDetails = async()=>{
        try {
            
            const courseData = await getFullDetailsOfCourse(courseId, token);

            console.log("Printing the response in View Course : ",courseData);
            setResponse(courseData);
            console.log("Course Data here... ", courseData.courseDetails)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            console.log("1111111111111111Hello me to yha hu ....................");
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))

            
        } catch (error) {
            console.log("There is some error in fetching full details of course ",error.message);
        }
    }
    
    useEffect(()=>{
        getFullCourseDetails();
    },[]);
    
    
  return (
        <div className=' w-full flex flex-row mt-16'>

            <VideoSideBar setReviewModal = {setReviewModal} reviewModal = {reviewModal}/>

            <div className=' w-[calc(100vw-300px)] ml-[300px]'>
                <Outlet/>
            </div>

            {
                reviewModal && <ReviewModal setReviewModal = {setReviewModal} reviewModal = {reviewModal}/>
            }
        </div>
  )
}

export default ViewCourse