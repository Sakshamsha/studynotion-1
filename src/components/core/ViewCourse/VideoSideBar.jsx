import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const VideoSideBar = ({setReviewModal}) => {

    const {courseId,sectionId,subSectionId} = useParams();

    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [response,setResponse] = useState(null);
    const [activeSection,setActiveSection] = useState(Array(0));
    const [activeVideo,setActiveVideo] = useState(null)
    const location = useLocation();
    const navigate = useNavigate();

        const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);



    useEffect(()=>{
        console.log("Printing the course Id : ",courseId);
        console.log("Printing the sectiom Id : ",sectionId);
        console.log("Printing the subSection Id : ",subSectionId);
        console.log("Hum Videosidebar ke andar hai");
        console.log("Printing the courseSectionData : ",courseSectionData);

        if (!courseSectionData.length) return
        const currentSectionIndx = courseSectionData.findIndex(
          (data) => data._id === sectionId
        )
        const currentSubSectionIndx = courseSectionData?.[
          currentSectionIndx
        ]?.subSection.findIndex((data) => data._id === subSectionId)
        const activeSubSectionId =
          courseSectionData[currentSectionIndx]?.subSection?.[
            currentSubSectionIndx
          ]?._id

        // const currentSubSectionIndex = courseSectionData[currentSectionIndex]
        // console.log("Printing the currentSubSectionIndex in view COurse : ",currentSubSectionIndex);
        

        setActiveVideo(activeSubSectionId);

        setActiveSection(activeSection.concat([courseSectionData?.[currentSectionIndx]?._id]));
    },[location.pathname,courseEntireData,courseSectionData]);


    function handleActiveSection(section){

        const id = section._id;

        setActiveSection(
            !activeSection.includes(id)
              ? activeSection.concat([id])
              : activeSection.filter((e) => e != id)
          )


        console.log("Printing the active Sction : ",activeSection);  
        console.log("Printing the active Sction : ",activeSection);  


    }

  return (
    <div className=' fixed bg-richblack-900 h-screen w-[300px] border-r-4 border-yellow-50 '>

                <div className=' flex justify-between mt-2 p-5 items-center'>
                    <BiLeftArrowAlt className=' text-richblack-400 text-4xl font-bold cursor-pointer hover:text-richblack-700 '
                         onClick={() => {
                            navigate(`/dashboard/enrolled-courses`)
                        }}
                    />
                    <button className=' rounded-md px-4 py-2 bg-yellow-50 hover:bg-yellow-200 text-richblack-900 font-bold'
                    onClick={()=>setReviewModal(true)}>Add Review</button>
                </div>

                <p className=' text-richblack-5 ml-5 font-bold'>{courseEntireData.courseName}</p>

                <p className='  text-sm text-richblack-300 ml-5 mt-3'>{completedLectures.length} / {totalNoOfLectures}</p>

                <div className=' bg-richblue-600 w-[90%] mx-auto h-[2px] mt-5 mb-10'></div>

                <div>
                    {
                        courseSectionData.map((section,index)=>{
                            return <div key={index}>

                                {/* Section wala container */}

                                <div className=' flex flex-col gap-3' onClick={()=>handleActiveSection(section)} >
                                    <div className=' p-4 flex justify-between bg-richblack-700 border-b-4 border-richblack-900 cursor-pointer'>
                                        <p className=' text-white font-bold'>{section.sectionName}</p>
                                        <div className=' text-white'>
                                            {
                                                    !activeSection.includes(section._id)?<FaAngleDown/>:<IoIosArrowUp/>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* SubSection wala container */}
                                <div>
                                    {
                                        activeSection.includes(section._id) && section.subSection.map((subS)=>{
                                            return <div key={subS._id} className={` cursor-pointer ${activeVideo == subS._id?" bg-yellow-50 ":""}`}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subS?._id}`
                                                )
                                            }}
                                            >
                                                <div className=' flex gap-3 p-3 border-b-2 border-richblack-700'>
                                                    <input
                                                        type='checkbox'
                                                        disabled= {true}
                                                        checked={completedLectures.includes(subS?._id)}
                                                        onChange={() => {}}
                                                        className=''
                                                        
                                                    />
                                                    <p className={`${activeVideo == subS._id?" text-richblack-900 ":" text-white"}`} >{subS.title}</p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                                
                            </div>
                        })
                    }
                </div>
    </div>
  )
}

export default VideoSideBar
