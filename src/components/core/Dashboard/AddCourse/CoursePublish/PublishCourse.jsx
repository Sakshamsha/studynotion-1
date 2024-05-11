import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { updateStatus } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
      } = useForm();
    
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const {course} = useSelector((state) => state.course);
      const {token} = useSelector((state)=>state.auth);
      const [loading,setLoading] = useState(false);

      const goBack = () => {
        dispatch(setStep(2));
      }

      const handleSave = async(data) => {
        const courseId = course._id;
        console.log("printing the data in publish Course : ",data);
        var status;
        if(data.public){
            status = "Published"
        }
        else{
            status = "Draft"
        }
        const result = await updateStatus({courseId,status,token});
        console.log("Update status Api has been called !!");
        dispatch(setCourse(result));
        dispatch(setStep(1));
        navigate("/dashboard/my-courses");
        



      }


  return (
    <div className=' bg-richblack-900 ml-24 w-11/12 p-7'>
        <div className=' text-richblack-5 text-2xl font-bold '>Publish Setting</div>

        <form onSubmit={handleSubmit(handleSave)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className=" cursor-pointer border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <button className=' bg-yellow-50 px-5 py-2 font-bold rounded-md'
          type='submit'>
                Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse