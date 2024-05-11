import React from 'react'
import { useForm } from 'react-hook-form';
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component"
import { createRating } from '../../services/operations/courseDetailsAPI';

const ReviewModal = ({reviewModal,setReviewModal}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm()

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse);

    console.log("Printing the user in ReviewModal : ",user);

    const ratingChanged = (newRating) => {
        // console.log(newRating)
        setValue("courseRating", newRating)
      }

      console.log("Printing the courseEntireData : ",courseEntireData);

    const onSubmit = async (data) => {
    await createRating(
        {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
        },
        token
    )
    setReviewModal(false)
    }  

  return (

    <div className=' fixed inset-0 z-10  grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='my-10 w-11/12 max-w-[700px] border border-richblack-400  rounded-md opacity-100'>
           <div className=' bg-richblack-700 flex justify-between p-4 items-center'>
                <p className=' text-xl font-bold text-richblack-5'>Add Review</p>
                <ImCross className=' text-richblack-5 cursor-pointer' onClick={()=>setReviewModal(false)}/>
           </div>

           <div className=' bg-richblack-800 flex flex-col items-center pt-7 w-full px-5 pb-9'>
                <div className=' flex gap-4 items-center'>
                    <img src = {user.image} width={50} className=' aspect-square rounded-full'/>
                    <div className=''>
                        <p className=' text-sm text-richblack-5 font-bold'>{user.firstName} {user.lastName}</p>
                        <p className=' text-sm text-richblack-5'>Posting Publicly</p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" w-full mt-6 flex flex-col items-center gap-3"
                >
                    <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                    />
                    <div className="flex w-11/12 flex-col space-y-2">
                    <label
                        className="text-sm text-richblack-5"
                        htmlFor="courseExperience"
                    >
                        Add Your Experience <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                        id="courseExperience"
                        placeholder="Add Your Experience here"
                        {...register("courseExperience", { required: true })}
                        className=" rounded-md border-b-2 border-richblack-500 bg-richblack-700 resize-x-none min-h-[130px] w-full p-4 text-richblack-5"
                    />
                    {errors.courseExperience && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Please Add Your Experience
                        </span>
                    )}
                    </div>
                    <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                    <button
                        onClick={() => setReviewModal(false)}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                    >
                        Cancel
                    </button>
                    <button className=' bg-yellow-50 py-2 px-5 rounded-md text-richblack-900 font-bold'>
                        Save
                    </button>
                    </div>
                </form>
           </div>
        </div>
    </div>
  )
}

export default ReviewModal