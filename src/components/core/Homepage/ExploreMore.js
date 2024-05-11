import React, { useState } from 'react'
import HighlightText from "./HighlightText"
import {HomePageExplore} from "../../../data/homepage-explore"

const ExploreMore = () => {

    const tabName = ["Free","New to coding","Most popular","Skills paths","Career paths"];

    const [currentTab,setCurrentTab] = useState(tabName[0]);
    const [currentCourse,setCurrentCourse] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{

      setCurrentTab(value);
      const result = HomePageExplore.filter((courses)=> courses.tag === value);
      setCurrentCourse(result[0].courses);
      setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className=''>
        <div className=' text-center text-4xl font-semibold'>Unlock the <HighlightText text = {"Power of Code"}/> </div>
        <div className=' text-richblack-300 font-bold text-center mt-2 text-[18px]'>Learn to Build Anything You Can Imagine</div>

        <div className='flex flex-row mt-6 gap-10 w-fit mx-auto bg-richblack-800 px-[5px] py-[3px] rounded-full border-b-[1px] border-richblack-400
                         text-richblack-200 font-bold mb-56'>
          {
            tabName.map((tab,index)=>{
              return <div className={`text-[16px] flex flex-row items-center gap-2 
                ${currentTab === tab 
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200" } rounded-full transition-all duration-200 cursor-pointer
                hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index} onClick={()=>setMyCards(tab)}
               >{tab}</div>
            })
          }
        </div>

        <div className=' flex flex-row gap-16 absolute top-[2220px] left-[10px] '>
          {
            currentCourse.map((course,ind)=>(
              <div className={` flex flex-col h-[300px] w-[360px] p-6 
               ${currentCard === course.heading ? " bg-[#FFFFFF] shadow-[12px_12px_0_0] shadow-yellow-50":" bg-richblack-800"}`} key={ind} onClick={()=>setCurrentCard(course.heading)}>
                <div className={` font-bold ${currentCard === course.heading?" text-[19px] text-richblack-900":" text-[19px] text-richblack-5 "}`}>{course.heading}</div>
                <div className={` h-[100px] ${currentCard === course.heading?" text-richblack-300 text-[17px]  mt-4":" text-richblack-500 text-[17px] mt-4"}`}>{course.description}</div>
                <div className=' border-dashed border-t-[2px] mt-20 border-richblack-400 flex flex-row justify-between'>
                  <div className=' flex flow-row items-center gap-2'>
                    <svg color={`${currentCard === course.heading?"#0F7A9D":"grey"}`} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 
                      016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                    <p className={`${currentCard === course.heading?" text-[#0F7A9D]":" text-pure-greys-200"}`}>{course.level}</p>  
                  </div>
                  <div className=' flex flow-row items-center gap-2'>
                    <svg color={`${currentCard === course.heading?"#0F7A9D":"grey"}`} stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em"
                    xmlns="http://www.w3.org/2000/svg"><path d="M15.25 12h-0.25v-3.25c0-0.965-0.785-1.75-1.75-1.75h-4.25v-2h0.25c0.412 0
                      0.75-0.338 0.75-0.75v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75
                      0.75h0.25v2h-4.25c-0.965 0-1.75 0.785-1.75 1.75v3.25h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75
                        0.75h2.5c0.413 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.337-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75
                        0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412
                          0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75zM3
                          15h-2v-2h2v2zM9 15h-2v-2h2v2zM7 4v-2h2v2h-2zM15 15h-2v-2h2v2z"></path></svg>

                    <p className={`${currentCard === course.heading?" text-[#0F7A9D]":" text-pure-greys-200"}`}>{course.lessionNumber} Lession</p>       
                  </div>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default ExploreMore

