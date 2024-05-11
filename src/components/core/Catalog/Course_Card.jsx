import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThisGetAverageRating from "../../../utils/avgRating"
import StarRatings from 'react-star-ratings';
import RatingStars from '../../common/RatingStars';

const Course_Card = ({course}) => {

  console.log("Printing the course in courseCard : ",course);

  const [rat,setRating] = useState(0);
  var x = 0;

  useEffect(()=>{
    const rating = ThisGetAverageRating(course?.ratingAndReview);
    console.log("Printing the rating Now : ",rating);
    setRating(rating);
    x = rating
    
    console.log("Printing the rat : ",rat);
  },[])


  return (
    <Link to={`/courses/${course._id}`} className=' text-white flex flex-col gap-3 p-2'>

        <div>
            <img src={course?.thumbnail} alt='Course-Image' className='h-[250px] min-w-[400px] rounded-md object-cover '/>
        </div>
        <div className=' text-richblack-25'>{course.courseName}</div>
        <div className=' text-sm leading-3 tracking-widest'>{course.instructor.firstName} {course.instructor.lastName}</div>
        <div className=' flex gap-2'>
          <p>{rat}</p>
          <StarRatings
          rating={rat}
          starRatedColor="yellow"
          // changeRating={changeRating}
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          name='rating'
        />
        <p>{course?.ratingAndReview.length} Ratings </p>
        </div>
        <div className=' text-yellow-50'>₹{course.price}</div>
    </Link>
  )
}

export default Course_Card