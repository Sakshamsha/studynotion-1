
import React, { useEffect, useReducer, useRef, useState } from 'react'
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';

const VideoDetails = () => {

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
} = useSelector((state)=>state.viewCourse);

console.log("I have enter into video Details >>>>>>>>>>>>>>>>>>>>");
  const playerRef = useRef(null);
  const [video,setVideo] = useState("");
  const [videoEnded, setVideoEnded] = useState(false)
  const {courseId,sectionId,subSectionId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const [videoData,setVideoData] = useState(null);

  const [currentSectionIndex,setCurrentSectionIndex] = useState(null);

  useEffect(()=>{

    console.log("I am in Video Details >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log("Printing the courseSectionData : ",courseSectionData);
    const currentSectionIndex = courseSectionData.findIndex((element)=>element._id === sectionId);
    console.log("Printing the currentSectionIndex : ",currentSectionIndex);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((element)=>element._id === subSectionId)
    console.log("Printing the currentSubSectionIndex : ",currentSubSectionIndex);
    setVideo(courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?.videoUrl);
    setVideoData(courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]);
    console.log("Printing the course Entire Data in VideoDetails : ",courseEntireData);
    console.log("Printing the course Section Data in VideoDetails : ",courseSectionData);
  },[courseEntireData,courseSectionData,location.pathname])

  const goToNextVideo = () =>{
    const currentSectionIndex = courseSectionData.findIndex((element)=>element._id === sectionId);
    // console.log("Printing the currentSectionIndex : ",currentSectionIndex);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((element)=>element._id === subSectionId)
    // console.log("Printing the currentSubSectionIndex : ",currentSubSectionIndex);

    if(courseSectionData[currentSectionIndex].subSection.length-1 === currentSubSectionIndex){
      const nextSectionIndex = currentSectionIndex + 1;
      const nextSubSectionIndex = 0;

      navigate(
        `/view-course/${courseEntireData?._id}/section/${courseSectionData[nextSectionIndex]?._id}/sub-section/${courseSectionData[nextSectionIndex]?.subSection[0]._id}`
      )
    }
    else{
      navigate(
        `/view-course/${courseEntireData?._id}/section/${courseSectionData[currentSectionIndex]?._id}/sub-section/${courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex+1]._id}`
      )
    }
  }

  const goToPrevVideo = () =>{
    const currentSectionIndex = courseSectionData.findIndex((element)=>element._id === sectionId);
    // console.log("Printing the currentSectionIndex : ",currentSectionIndex);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((element)=>element._id === subSectionId)
    // console.log("Printing the currentSubSectionIndex : ",currentSubSectionIndex);

    if(0 === currentSubSectionIndex){
      const prevSectionIndex = currentSectionIndex - 1;
      const prevSubSectionIndex = courseSectionData[prevSectionIndex].subSection.length-1;

      navigate(
        `/view-course/${courseEntireData?._id}/section/${courseSectionData[prevSectionIndex]?._id}/sub-section/${courseSectionData[prevSectionIndex]?.subSection[prevSubSectionIndex]._id}`
      )
    }
    else{
      navigate(
        `/view-course/${courseEntireData?._id}/section/${courseSectionData[currentSectionIndex]?._id}/sub-section/${courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex-1]._id}`
      )
    }
  }

  const isLastVideo = ()=>{
    const currentSectionIndex = courseSectionData.findIndex((element)=>element._id === sectionId);
    // console.log("Printing the currentSectionIndex : ",currentSectionIndex);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((element)=>element._id === subSectionId)
    // console.log("Printing the currentSubSectionIndex : ",currentSubSectionIndex);

    if(currentSectionIndex === courseSectionData.length-1 && 
      currentSubSectionIndex === courseSectionData[currentSectionIndex].subSection.length-1
    ){
      return true;
    }

    return false;
  }

  const isFirstVideo = () =>{
    const currentSectionIndex = courseSectionData.findIndex((element)=>element._id === sectionId);
    // console.log("Printing the currentSectionIndex : ",currentSectionIndex);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((element)=>element._id === subSectionId)
    // console.log("Printing the currentSubSectionIndex : ",currentSubSectionIndex)

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }

    return false;
  }

  const handleLectureCompletion = async () => {
    // setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    // setLoading(false)
  }

  return (
    <div className=' min-h-screen bg-richblack-900'>
      <div className=''>
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={video}
        >
           <BigPlayButton position="center" />

           {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] flex justify-center items-center flex-col h-full  font-inter"
            >

            {
              !completedLectures.includes(subSectionId) && 
              <button className=' bg-yellow-50 text-richblue-900 font-bold py-2 px-4 text-2xl rounded-md'
              onClick={()=>handleLectureCompletion()}>
                Mark As Completed
              </button>
            }

            <button className=' text-center w-fit text-richblack-900 font-bold
             mt-3 text-[20px] bg-yellow-50 py-3 rounded-md px-3'
             onClick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                >Rewatch</button>

                <div className=' flex items-center justify-center gap-4'>
                  { 
                    !isFirstVideo() && <button className=' text-[20px] font-bold rounded-md mt-10 bg-richblack-800 px-4 py-2'
                    onClick={()=>goToPrevVideo()}>
                      Prev
                    </button>  
                  }
                  { 
                    !isLastVideo() && <button className=' text-[20px] font-bold rounded-md mt-10 bg-richblack-800 px-4 py-2'
                    onClick={()=>goToNextVideo()}>
                      Next
                    </button>  
                  }
                </div>

            </div>
          )}
        </Player>
      </div>

      <p className=' text-richblack-5 text-3xl font-bold mt-5 ml-5'>{videoData?.title}</p>
      <p className=' text-richblack-5 mt-3 ml-5 pb-10'>{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails