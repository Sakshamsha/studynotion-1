import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { IoTimeOutline } from "react-icons/io5";
import { formatDate } from '../services/formDate';
import { MdLanguage } from "react-icons/md";
import Footer from '../components/common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/studentFeatureAPI';
import CourseBuyCard from '../components/core/CourseBuy/CourseBuyCard';
import ConfirmationModal from '../components/core/Dashboard/ConfirmationModal';
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import StarRatings from 'react-star-ratings';
import { IoIosVideocam } from "react-icons/io";
import CourseSlider from '../components/core/Catalog/CourseSlider';
import ThisGetAverageRating from '../utils/avgRating';

const CourseDetails = () => {

    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [activeSection,setActiveSection] = useState(Array(0));
    const [rat,setRating] = useState(0);

    // const [loading,setLoading] = useState(false);
    const [course,setCourse] = useState(null);

    const fetchCourseDetails2 = async()=>{

        try{

            const result = await fetchCourseDetails(courseId);
            console.log("Printing the result in course Details : ",result);
            console.log("Printing the result[0] in course Details@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : ",result[0]);
            console.log("Printing the result[0] intructor courses in course Details : ",result[0].instructor.courses);
            const rating = ThisGetAverageRating(result[0]?.ratingAndReview)
            setCourse(result[0]);
            setRating(rating);

            // console.log("Printing the course in course Details : ",course);
            // console.log("Printing the course in course Details : ",course.instructor.courses);

            // setAllSection(course.courseContent);
            // console.log("Printing the course in course Details : ",course);
        }

        catch(error){
            console.log("Printing the error : ",error);
            console.log("There is some error in fetching course Details ");
        }
    }

    const [totalLength,setTotalLength] = useState(0);
    const [allSection,setAllSection] = useState(null);

    useEffect(()=>{
        fetchCourseDetails2();

        // calculateLength();

        console.log("Printing the total Lenght in useEffect : ",totalLength);
    },[courseId]);

    useEffect(()=>{
        function calculateLength(){
            let len = 0;

            if(course){

                course.courseContent.map((section)=>{
                    len+=section.subSection.length
                })
    
                setTotalLength(len);
    
                console.log("Printing the lenght : ",totalLength);

                setAllSection(course.courseContent);
                console.log("Printing all the allSection : ",allSection);
            }

            
        }

        calculateLength();
    },[course]);

    if(!course){
        return <div> No Course Yet</div>
    }

    const handleBuyCourse = async(req,res)=>{
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
          }
    }

    function handleActiveSection(section){

        const id = section._id;

        if(!activeSection.includes(id)){
            var arr = activeSection.concat([id]);
            console.log("This is the active session : ",arr);
        }
        else{
            var arr = activeSection.filter((e)=>e!=id);
            console.log("Printing the active Section : ",arr);
        }
        setActiveSection(
            !activeSection.includes(id)
              ? activeSection.concat([id])
              : activeSection.filter((e) => e != id)
          )


        console.log("Printing the active Sction : ",activeSection);  
        console.log("Printing the active Sction : ",activeSection);  


    }



  return (
    // <div className=' mt-20'>Helo Jee My name is saksham Sharma</div>
    <div>

        {/* Section-1 */}
        <div className=' w-full bg-richblack-900 pt-20 relative'>
            <div className=' w-11/12 max-w-maxContent mx-auto'>
                <div className=' text-richblack-5 text-4xl font-bold mt-10 w-[70%]'>Web Development Master Course @dot Batch</div>
                <div className=' text-richblack-300 font-bold mt-5  w-[70%]'>{course.courseDescription}</div>

                {/* TODO:ADD RATING HERE */}
                <div className=' flex gap-2  items-center mt-3'>
                    <p className=' pt-2 text-yellow-50 text-xl'>{rat}</p>
                    <StarRatings
                    rating={rat}
                    starRatedColor="yellow"
                    // changeRating={changeRating}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name='rating'
                    
                    />
                    <p className=' text-xl text-yellow-50 pt-2'>{course?.ratingAndReview?.length} Reviews </p>
                    <p className=' text-xl text-richblack-50 pt-2'>{course?.studentsEnrolled?.length} students enrolled </p>
                </div>
                <div className=' text-richblack-25 mt-5'>Created By {course?.instructor?.firstName} {course.instructor.lastName}</div>

                <div className=' mt-5 text-richblack-25 flex items-center gap-3 pb-20'>
                    <IoTimeOutline className=' text-yellow-50'/>
                    <div className=' text-yellow-50'> Created At : {formatDate(course.createdAt)}</div>
                    <MdLanguage/>
                    <div>English</div>
                </div>

                <CourseBuyCard course = {course} setConfirmationModal={setConfirmationModal} handleBuyCourse = {handleBuyCourse}/>
            </div>
        </div>

        {/* Section-2 */}
        <div className=' w-full bg-richblack-800 pt-20 pb-6'>
            <div className=' w-11/12 max-w-maxContent mx-auto'>

                {/* Section-1 */}
                <div className=' w-[60%] border-[1px] border-richblack-25 p-10'>
                    <div className=' text-3xl text-richblack-25 font-bold'>What you'll learn</div>
                    <div className=' mt-5 text-richblack-50'>{course.whatWillYouLearn}</div>
                </div>

                <div className=' w-[60%]'>
                    <p className=' text-3xl text-richblack-5 font-bold mt-10'>Course Content</p>
                    <div className=' flex justify-between mt-4'>
                        <div>
                            <span className=' mt-5 text-richblack-5'>{course.courseContent.length} section(s)</span>
                            <span className=' text-richblack-5 ml-3'>{totalLength} lecture(s)</span>
                        </div>
                        <div className=' text-yellow-50 cursor-pointer hover:text-yellow-200' 
                        onClick={()=>setActiveSection(Array(0))}>
                            Collapse all sections 
                        </div>
                    </div>

                    <div className=' mt-4'>
                        {
                            course.courseContent.map((section)=>{
                                return <div key={section._id}>
                                    <div className={` flex justify-between items-center
                                    bg-richblack-700 h-20 border-2 border-richblack-600 px-5 cursor-pointer `}
                                     onClick={()=>handleActiveSection(section)}>
                                        <div className=' flex text-richblack-5 items-center gap-3'>
                                            <div>

                                                {
                                                    !activeSection.includes(section._id)?<FaAngleDown/>:<IoIosArrowUp/>
                                                }
                                            
                                            </div>
                                            <div>{section.sectionName}</div>
                                        </div>
                                        <div className=' text-yellow-50'>{section.subSection.length} lecture(s)</div>
                                    </div>

                                    <div>
                                        {
                                            activeSection.includes(section._id) && section.subSection.map((sub)=>{
                                                return <div  className=' duration-1000  transition-all  text-richblack-5 bg-richblue-900 h-20 border-[1px] border-richblack-700'>
                                                    <div className=' flex items-center gap-3 p-5'>
                                                        <IoIosVideocam className=' text-yellow-50'/>
                                                        <div className=' font-bold'>
                                                            {sub.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <div className=' mt-7'>
                        <p className=' text-richblack-5 text-2xl font-bold'>Author</p>
                        <div className=' flex items-center mt-5 gap-4'>
                            <img src={course.instructor.image} width={60} className=' rounded-full object-cover aspect-square'/>
                            <p className=' text-caribbeangreen-200 text-[18px] tracking-wide'>{course.instructor.firstName} {course.instructor.lastName}</p>
                        </div>

                        <div className=' text-richblack-50 mt-3'>
                            {course.instructor.additionalDetails.about}
                            {/* Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny. */}
                        </div>
                    </div>
                </div>

                {/* Review Slider */}
                {/* <div className=' mt-32'>
                    <div className=' text-4xl text-richblack-5 font-bold text-center'>Reviews from Students</div>
                </div> */}

                <div className=' mt-10 pb-10'>
                    <p className=' text-richblack-25 text-3xl font-bold text-center'>More Courses by {course.instructor.firstName} {course.instructor.lastName}</p>

                    <div className=' mt-5'>
                        {
                            course.instructor.courses.length>0?<div>
                                <CourseSlider Courses = {course.instructor.courses}/>
                            </div>:
                            <div className=' text-caribbeangreen-100 mt-5'>
                                This author have not uploaded any course yet.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>


        


        <Footer/>

        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>
  )
}

export default CourseDetails