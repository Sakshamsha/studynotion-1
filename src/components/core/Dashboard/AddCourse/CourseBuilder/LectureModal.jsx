import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Upload from '../CourseInformation/Upload';
import { ImCross } from "react-icons/im";
import { createSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';

const LectureModal = ({setLectureModal,lectureModal}) => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = async(data) =>{

    const formData = new FormData();

    formData.append("sectionId",lectureModal);
    formData.append("title",data.lectureTitle);
    formData.append("description",data.lectureDescription);
    formData.append("timeDuration","2h");
    formData.append("videoFile",data.lectureVideo);
    formData.append("courseId",course._id);


    const result = await createSubSection(formData,token);
    dispatch(setCourse(result));
    setLectureModal(null);

  }

  return (
    <div className='fixed inset-0 z-10  grid place-items-center overflow-auto bg-richblack-600 bg-opacity-10 backdrop-blur-sm p-3'>

      <form onSubmit={handleSubmit(handleOnSubmit)} className=' bg-richblack-900 p-5 border-[3px] border-richblack-500 rounded-md opacity-100 w-6/12'>

        <div className=' flex flex-row justify-between text-richblack-700 mb-10 items-center'>
          <div className=' text-white text-2xl font-bold'> Adding Lecture</div>
          <ImCross onClick={()=>setLectureModal(null)} className=' text-white cursor-pointer '/>
        </div>

        <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
        />

        <div className="flex flex-col space-y-2 mt-8">
          <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
            Lecture Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="lectureTitle"
            placeholder="Add Lecture Title"
            {...register("lectureTitle", { required: true })}
            className="form-style w-full text-richblack-5 bg-richblack-700 px-3 py-3 border-b-[1px] border-richblack-200 rounded-md"
          />
          {errors.lectureTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Lecture title is required
            </span>
        )}
        </div>

        <div className="flex flex-col space-y-2 mt-8">
          <label className="text-sm text-richblack-5" htmlFor="lectureDescription">
          Lecture Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="lectureDescription"
            placeholder="Add Lecture Description"
            {...register("lectureDescription", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full  text-richblack-5 bg-richblack-700 px-3 py-3 border-b-[1px] border-richblack-200 rounded-md"
          />
          {errors.lectureDescription && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Lecture Description is required
            </span>
          )}
      </div>

      <button type='submit' className=' w-fit bg-yellow-50 px-5 py-2 rounded-md font-semibold cursor-pointer mt-8 mb-5 ml-[590px]'>
          Save
      </button>


      </form>
    </div>
  )
}

export default LectureModal