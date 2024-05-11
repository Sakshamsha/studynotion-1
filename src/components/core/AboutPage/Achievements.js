import React from 'react'

const Achievements = () => {

    const data = [
        {number:"5K",description:"Active Students"},
        {number:"10+",description:"Mentors"},
        {number:"200+",description:"Courses"},
        {number:"50+",description:"Awards"}
    ]
  return (
    <div className=' w-full mt-10 pb-10'>
        <div className=' w-11/12 max-w-maxContent mx-auto flex flex-row gap-5 justify-around'>
            {
                data.map((element,index)=>(
                    <div key={index} className=' flex flex-col items-center'>
                        <div className=' text-richblack-5 text-3xl font-bold'>{element.number}</div>
                        <div className=' text-richblack-500 font-bold'>{element.description}</div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Achievements