import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import NestedView from './NestedView';
import { BiRightArrowCircle } from "react-icons/bi";
import toast from 'react-hot-toast';

const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [editSectionName,setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state)=>state.auth);

  async function handleEditSubmit(){
    const currentValues = getValues();

    const sectionName = currentValues.sectionName;

    const formData = new FormData();
    formData.append("sectionName",sectionName);
    formData.append("sectionId",editSectionName);
    formData.append("courseId",course._id);

    const result = await updateSection(formData,token);

    console.log("Printing the course in courseBuilder : ",result);

    setEditSectionName(null);
    setValue("sectionName","");

    dispatch(setCourse(result));

  }

  async function handleOnSubmit(data){

    if(editSectionName){
      handleEditSubmit(data);
      return;
    }

    const sectionName = data.sectionName;
    const courseId = course._id;

    const formData = new FormData();

    formData.append("sectionName",sectionName);
    formData.append("courseId",courseId);

    const result = await createSection(formData,token);

    console.log("printing the result : ",result);

    dispatch(setCourse(result));

    console.log("Section Created Successfully");

    setValue("sectionName","");

  }

  function handleCancel(){
    setEditSectionName(false);
    setValue("sectionName","");
  }

  function handleEdit(sectionName,sectionId){
    if(editSectionName != sectionId){
      setEditSectionName(sectionId);
      setValue("sectionName",sectionName);
    }
    else{
      handleCancel();
    }
  }


  useEffect(()=>{
    console.log("Value of course is : ",course);
  })

  const goBack = () => {

    console.log("goBack button is clicked");
    dispatch(setEditCourse(true));
    dispatch(setStep(1));

  }

  const handleNext = () => {

    console.log("Next button is clicked");



    if(!course.courseContent.length>0){
      toast.error("Atleast One Section Shoul be there in EachCourse");
      return;
    }

    var flag = 0;
    course.courseContent.map((section)=>{
      if(!section.subSection.length>0){
        toast.error("Add atleast one lecture in each section");
        flag = 1;
      }
    })

    if(flag){
      return;
    }
    dispatch(setStep(3));

  }


  return (
    <div className=' border border-richblack-400 rounded-md ml-20 py-7 px-7 bg-richblack-900'>

        <p className=' text-2xl font-bold text-richblack-5'>Course Builder</p>

        <form onSubmit={handleSubmit(handleOnSubmit)} className=' mt-10 border border-richblack-400 rounded-md py-7 px-5 '>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="sectionName">
              Section Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="sectionName"
              placeholder="Add section name"
              {...register("sectionName", { required: true })}
              className="form-style w-full text-richblack-5 bg-richblack-800 px-3 py-3 border-b-[1px] border-richblack-200 rounded-md"
            />
            {errors.sectionName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
               Section name is required
              </span>
            )}
          </div>

          <div className=' flex gap-5 items-baseline'>
            <button className=' rounded-md font-semibold border-[2px] border-yellow-50 text-yellow-50 flex justify-center items-center gap-2 py-1 px-5 mt-5'
            // onClick={(e) => e.preventDefault()}
            type='submit'>
              {
                editSectionName?"Edit Section Name":"Create Section"
              }

              <FiPlusCircle/>

            </button>

            {
              editSectionName && 
              <button className=' underline cursor-pointer text-sm text-richblack-300'
              onClick={()=>handleCancel()}>
                Cancel Edit
              </button>
            }
          </div>
        </form>

        <NestedView handleEdit = {handleEdit}/>

        <div className=' flex flex-row gap-3 font-bold mt-10 ml-80'>

          <button className=' bg-richblack-700 text-richblack-25 py-2 px-4 rounded-md' onClick={()=>goBack()}>
            Back
          </button>

          <button className=' bg-yellow-50 flex items-center py-2 px-4 gap-2 rounded-md' onClick={()=>handleNext()}>
            <p>Next</p>
            <BiRightArrowCircle className=' font-bold'/>
          </button>
        </div>



    </div>
  )
}

export default CourseBuilderForm