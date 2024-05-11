import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import { catalogData } from '../../../../../services/apis';
import ConfirmationModal from '../../ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { GoPlus } from "react-icons/go";
import LectureModal from './LectureModal';
import EditLectureModal from './EditLectureModal';
import ViewLectureModal from './ViewLectureModal';

const NestedView = ({handleEdit}) => {

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    console.log("Printing the value of course in NestedView : ",course);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [lectureModal,setLectureModal] = useState(null);
    const [editLectureModal,setEditLectureModal] = useState(null);
    const [viewLectureModal,setViewLectureModal] = useState(null);

    const handleDeleteSection = async(sectionId) =>{

        const courseId = course._id;

        // const formData = new FormData();

        // formData.append("courseId",courseId);
        // formData.append("sectionId",sectionId);

        console.log("This is the point where have you clicked the delete button",sectionId);
        console.log("This is the point where have you clicked the delete button",courseId);
        const result = await deleteSection({sectionId,courseId,token});

        setConfirmationModal(null);

        dispatch(setCourse(result));

    }

    const handleDeleteSubSection = async(subSectionId,sectionId)=>{

        const courseId = course._id;

        // const formData = new FormData();

        // formData.append("courseId",courseId);
        // formData.append("sectionId",sectionId);

        console.log("This is the point where have you clicked the delete button",sectionId);
        console.log("This is the point where have you clicked the delete button",courseId);
        const result = await deleteSubSection({subSectionId,sectionId,courseId,token});

        setConfirmationModal(null);

        dispatch(setCourse(result));

    }

  return (
    <div className=' bg-richblack-800 mt-7 py-3 px-5 rounded-md  '>
    {
        course.courseContent.length>0?
        (
            <div>
                {
                    course.courseContent.map((section)=>(
                        <details key={section._id} className=' cursor-pointer py-5 border-b-[1px] border-richblack-300' open>
                            <summary className=' flex justify-between'>
                                <div className=' flex gap-3 items-center'>
                                    <IoIosArrowDropdownCircle className=' text-xl text-richblack-300'/>
                                    <p className=' text-richblack-5'>{section.sectionName}</p>
                                </div>
                                <div className=' flex gap-3 items-center text-xl text-richblack-300'>
                                    <MdEdit onClick={()=>handleEdit(section.sectionName,section._id)} className=' text-xl text-richblack-300 cursor-pointer'/>
                                    <MdDelete className=' text-xl text-richblack-300 cursor-pointer'
                                        onClick={ () => setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All the lectures in this Section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })}
                                    />
                                    |
                                    <BiDownArrow className=' text-xl text-richblack-300 cursor-pointer'/>
                                </div>
                            </summary>
                            {
                                section.subSection.length>0?(
                                    <div>
                                        {
                                            section.subSection.map((subSection)=>(
                                                <div className=' cursor-pointer ml-5 flex justify-between  py-5 border-b-[1px] border-richblack-300'
                                                    onClick={()=>setViewLectureModal({
                                                                sectionId:section._id,
                                                                subSectionId:subSection._id,
                                                                lectureTitle:subSection.title,
                                                                lectureDescription:subSection.description,
                                                                lectureVideo:subSection.videoUrl
                                                            })}
                                                            >
                                                    <div className=' flex gap-3 items-center'>
                                                        <IoIosArrowDropdownCircle className=' text-xl text-richblack-300'/>
                                                        <p className=' text-richblack-5'>{subSection.title}</p>
                                                    </div>
                                                    <div className=' flex gap-3 items-center text-xl text-richblack-300'
                                                    onClick={(e) => e.stopPropagation()}>
                                                        <MdEdit className=' text-xl text-richblack-300 cursor-pointer'
                                                            onClick={()=>setEditLectureModal({
                                                                sectionId:section._id,
                                                                subSectionId:subSection._id,
                                                                lectureTitle:subSection.title,
                                                                lectureDescription:subSection.description,
                                                                lectureVideo:subSection.videoUrl
                                                            })}
                                                        />
                                                        <MdDelete className=' text-xl text-richblack-300 cursor-pointer'
                                                            onClick={ () => setConfirmationModal({
                                                                text1: "Delete this Sub Section",
                                                                text2: "Selected lectures in this Sub Section will be deleted",
                                                                btn1Text: "Delete",
                                                                btn2Text:"Cancel",
                                                                btn1Handler: () => handleDeleteSubSection(subSection._id,section._id),
                                                                btn2Handler: () => setConfirmationModal(null),
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                
                                )
                                
                                :(<div></div>)
                            }
                            <div className=' flex gap-2 text-yellow-50 items-center ml-8 mt-3 cursor-pointer' onClick={() =>setLectureModal(section._id)}>
                                <GoPlus/>
                                <p>Add Lecture</p>
                            </div>
                        </details>
                    ))
                }
            </div>
        ):
        <div>

        </div>
    }

    {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
    }

    {
        lectureModal && <LectureModal lectureModal = {lectureModal} setLectureModal = {setLectureModal}/>
    }

    {
        editLectureModal && <EditLectureModal editLectureModal = {editLectureModal} setEditLectureModal = {setEditLectureModal}/>
    }

    {
        viewLectureModal && <ViewLectureModal viewLectureModal = {viewLectureModal} setViewLectureModal = {setViewLectureModal}/>
    }

    </div>

  )
}

export default NestedView