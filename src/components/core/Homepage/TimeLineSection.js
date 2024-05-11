import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"

const TimeLineSection = () => {

    const Timeline = [
        {
            Logo:Logo1,
            Heading:"Leadership",
            description:"Fully committed to the success company"
        },

        {
            Logo:Logo2,
            Heading:"Responsibility",
            description:"Students will always be our top priority"
        },

        {
            Logo:Logo3,
            Heading:"Flexibility",
            description:"The ability to switch is an important skills"
        },

        {
            Logo:Logo4,
            Heading:"Solve the problem",
            description:"Code your way to a solution"
        },
    ]

  return (
    <div className=' mt-16'>
        {/* TimeLineSection */}
        <div className=' w-11/12 max-w-maxContent mx-auto flex gap-5 justify-between'>
            {/* Left Part */}
            <div className=' flex flex-col gap-20 w-[30%] ml-10'>
                {
                    Timeline.map((element,index)=>(
                        <div key={index} className=' flex gap-5 items-center'>

                            <div className=' bg-white rounded-full p-3'>
                                <img src={element.Logo}/>
                            </div>

                            <div className=''>
                                <div className=' font-bold text-[19px]'>{element.Heading}</div>
                                <div className=' text-richblack-500'>{element.description}</div>
                            </div>

                        </div>
                        
                    ))
                }
            </div>

            {/* Right Part */}
            <div className=' w-[50%] mr-7 relative'>
                <div className='shadow-blue-200 shadow-[10px_-5px_50px_-5px] '>
                    <img src={timeLineImage} className='shadow-[20px_20px_rgba(255,255,255)]'/>
                </div>
                <div className=' h-[122px] bg-caribbeangreen-700 w-[85%] mx-auto
                 absolute left-12 flex items-center justify-around  bottom-[-55px] '>
                    <div className='flex justify-between items-center gap-12
                              border-r-[1px] border-caribbeangreen-300 pr-16'>
                        <div className=' text-white text-3xl font-bold'>10</div>
                        <div className=' text-caribbeangreen-300 text-[13px]'>
                            <div>YEARS</div>
                            <div>EXPERIENCES</div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-12  '>
                        <div className=' text-white text-3xl font-bold'>250</div>
                        <div className=' text-caribbeangreen-300 text-[13px]'>
                            <div>TYPES OF</div>
                            <div>COURSES</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection