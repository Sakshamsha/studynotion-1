import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from "../components/core/Homepage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import TimeLineSection from "../components/core/Homepage/TimeLineSection"
import LearningSection from "../components/core/Homepage/LearningSection"
import InstructorSection from '../components/core/Homepage/InstructorSection'
import Footer from "../components/common/Footer"
import ExploreMore from '../components/core/Homepage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'


const Home = () => {
  return (
    <div>

        {/* Section - 1 */}
        <div className=' w-[100%] bg-richblack-900 pt-7'>
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
        text-white justify-between '>

                <Link to={"/signup"}>
                    <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                    transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>

                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
                </div>

                <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}> 
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}> 
                    Book a Demo
                </CTAButton>
                </div>

                <div className='mx-3 my-12 shadow-blue-200 shadow-[10px_-5px_50px_-5px] '>
                <video className='shadow-[20px_20px_rgba(255,255,255)]'
                muted
                loop
                autoPlay
                >
                <source  src={Banner} type="video/mp4" />
                </video>
                </div>

                <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={"coding potential"}/><p> </p>
                            with our online courses
                        </div>
                    }
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang = "en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href = "/">Header</a></h1>\n<nav><a href = "/one">One</a> <a \n href = "/two">Two</a> <a href = "/three">Three</a> \n </nav> \n</body>`}
                    codeColor={"text-yellow-25"}
                />
                </div>


                <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"coding in seconds"}/>
                            
                        </div>
                    }
                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`  import React from "react";
                                    import CTAButton from "./Button";
                                    import TypeAnimation from "react-type";
                                    import { FaArrowRight } from "react-icons/fa";

                                    const Home = () => {
                                    return (
                                    <div>Home</div>
                                    )
                                    }
                                    export default Home;
                                                        `}
                    codeColor={"text-blue-25"}
                />
                </div>

                <ExploreMore/>



            </div>
        </div>


        {/* Section -2  */}
        <div className=' w-[100%] bg-pure-greys-5 text-richblack-700'>
             <div className='backImage h-[310px] flex items-center'>
                <div className=' w-11/12 max-w-maxContent mx-auto flex  gap-7 justify-center mt-32'>
                    {/* First Button */}
                    <div className=' w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className=' w-fit flex flex-row  gap-2'>
                                <p>Explore Full Catalog</p>
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                    {/* Second Button */}
                    <div className=' w-fit'>
                        <CTAButton active={false} linkto={"/login"}>
                               <p className=' text-richblack-5'> Learn More</p>
                        </CTAButton>
                    </div>
                </div>
             </div>    

            <div className=' w-11/12 max-w-maxContent flex mx-auto justify-between mt-20'>
                <div className=' w-[40%] text-4xl font-semibold'>
                    Get the skills you need for a
                    <HighlightText text={"job that is in demand."}/>
                </div>
                <div className=' w-[40%] flex flex-col gap-10'>
                    <div>
                        The modern StudyNotion is the dictates its own terms.
                        Today, to be a competitive specialist requires more 
                        than professional skills.
                    </div>
                    <div className=' w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                                <p>Learn More</p>
                        </CTAButton>
                    </div>
                </div>
             </div>   

             <div>
                <TimeLineSection/>
             </div>

             <div>
                <LearningSection/>
             </div>            
        </div>

        {/* Section - 3 */}
        <div className='w-[100%] bg-richblack-900 mt-20 pb-5'>
            <InstructorSection/>
            <div className=' w-11/12 max-w-maxContent mx-auto'>
                <div className=' text-4xl text-richblack-5 font-semibold mt-16 text-center'>
                Reviews from other learners</div>

                <ReviewSlider/>
            </div>
        </div>

        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default Home