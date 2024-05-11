import React from 'react'
import HighlightText from "../components/core/Homepage/HighlightText"
import logo1 from "../assets/Images/aboutus1.webp"
import logo2 from "../assets/Images/aboutus2.webp"
import logo3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Achievements from '../components/core/AboutPage/Achievements'
import Description from '../components/core/AboutPage/Description'
import ContactForm from '../components/core/ContactPage/ContactForm'
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'


const About = () => {
  return (

    <div className='bg-richblack-700'> 

      {/* Section-1 */}
      <div className=' w-full bg-richblack-700 relative '>
        <div className=' text-4xl font-semibold text-richblack-5 text-center mt-36 w-[55%] mx-auto'>
            Driving Innovation in Online Education for a 
            <HighlightText text={"Brighter Future"}/>
        </div>

        <div className=' text-richblack-200 w-[57%] text-center mt-3  mx-auto mb-72'>
            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter
            future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
        </div>

        <div className=' flex flex-row gap-10 w-11/12 max-w-maxContent mx-auto mt-14 absolute top-36 left-28'>
          <img src={logo1}/>
          <img src={logo2}/>
          <img src={logo3}/>
        </div>
      </div>

      {/* Section-2 */}
      <div className=' w-full bg-richblack-900 border-b-[1px] border-richblack-700'>
          <div className=' w-11/12 max-w-maxContent text-center mx-auto text-4xl text-richblack-5 font-semibold pt-36 pb-20 '>
            We are passionate about revolutionizing the way we learn. Our innovative
            platform <HighlightText text={"combines technology"}/> , 
            <span className='bg-gradient-to-b from-[#FF512F]  to-[#F09819] bg-clip-text text-transparent'>expertise</span>,
             and community to create an <span className='bg-gradient-to-b from-[#FF512F]  to-[#F09819] bg-clip-text text-transparent'>unparalleled educational experience.</span>
          </div>
      </div>

      {/* Section-3 */}
      <div className=' w-full bg-richblack-900 pb-24'>

        <div className=' w-11/12 max-w-maxContent mx-auto flex flex-row gap-40  pt-24'>

            {/* Left Part */}
          <div className=' w-[48%]'>
            <div className=' bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent
                             text-4xl font-semibold'>
              Our Founding Story</div>

            <div className=' text-richblack-300 mt-10'>
                Our e-learning platform was born out of a shared vision and passion for transforming
                education. It all began with a group of educators, technologists, and lifelong learners
                who recognized the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
            </div>

            <div className='text-richblack-300 mt-10'>
                As experienced educators ourselves, we witnessed firsthand the limitations and
                challenges of traditional education systems. We believed that education should not
                be confined to the walls of a classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower individuals from all
                walks of life to unlock their full potential.
            </div>
          </div>

          {/* Right part */}
          <div className=' w-[40%] flex items-center justify-center'>
              <img src={FoundingStory} className=' shadow-[0_0_20px_0] shadow-[#FC6767]'/>
          </div>

        </div>

        <div className=' w-11/12 max-w-maxContent mx-auto flex flex-row pt-56 justify-between '>
          
          {/* Left part */}
          <div className=' w-[38%]'>
            <div className='bg-gradient-to-br from-[#FF512F]  to-[#F09819] bg-clip-text text-transparent
                             text-4xl font-semibold'>Our Vision</div>

            <div className=' text-richblack-300 mt-10'>
              With this vision in mind, we set out on a journey to create an e-
              learning platform that would revolutionize the way people learn. Our
              team of dedicated experts worked tirelessly to develop a robust and
              intuitive platform that combines cutting-edge technology with
              engaging content, fostering a dynamic and interactive learning
              experience.
            </div>

          </div>

          {/* Right Part */}
          <div className=' w-[38%]'>
            <div className='bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent
                             text-4xl font-semibold'>Our mission</div>
            <div className=' text-richblack-300 mt-10'>
              Our mission goes beyond just delivering courses online. We
              wanted to create a vibrant community of learners, where individuals
              can connect, collaborate, and learn from one another. We believe
              that knowledge thrives in an environment of sharing and dialogue,
              and we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </div>
          </div>
        </div>
          

      </div>

      <Achievements/>
      <Description/>

      {/* Section-4 */}
      <div className=' w-full bg-richblack-900 pt-20 pb-32'>
          <div className=' text-richblack-5 text-4xl text-center font-semibold'>Get In Touch</div> 
          <div className=' text-richblack-300 text-center mt-3'>We'd love to here for you, Please fill out this form.</div>   
          <div className=' w-[30%] mx-auto mt-10'>
            <ContactForm/>
          </div>
      </div>


      {/* Sectiomn-5 */}
      <div className=' w-11/12 max-w-maxContent mx-auto pt-7 '>
          <div className=' text-4xl font-semibold  text-richblack-5 text-center'>Reviews from other learners</div>

          <ReviewSlider/>
      </div>

      <Footer/>
      




    </div>
    
  )
}

export default About