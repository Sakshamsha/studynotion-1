const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudianry } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.createCourse = async(req,res) => {
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category,instructions} = req.body;

        console.log("Hello Everybody!!");

        console.log("printing the request : ",req.body);

        console.log("printing the request.files",req.files);

        const thumbnail = req.files.thumbnailImage;

        console.log("Printing the tags : ",tag);
        console.log("Printing the instructions : ",instructions);

        const tt = JSON.parse(tag);
        const it = JSON.parse(instructions);

        console.log("Printing the tt : ",tt);
        console.log("Printing the it : ",it);



        console.log("thumbnail : ",thumbnail);
        console.log("type of thumnail : ",typeof(thumbnail));




        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details : ",instructorDetails);

        console.log("Now I am in the backend : ");

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            });
        }

        console.log("Now I am in the backend-2 : ");

        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
          return res.status(404).json({
            success: false,
            message: "Category Details Not Found",
          })
        }

        console.log("Now I am in the backend-3 : ");

        // console.log("I am now the image : ");

        // console.log("printing the thumbnail : ",thumbnail);

        const thumbnailImage = await uploadImageToCloudianry(thumbnail,process.env.FOLDER_NAME);

        console.log("Now I am in the backend-4 : ");

        console.log("Now i am after thumbnail Image");

        const newCourse = await  Course.create({
            courseName,courseDescription,
            instructor:instructorDetails._id,
            whatWillYouLearn:whatYouWillLearn,
            price,category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            instructions:it,
            tags : tt,
            status:"Draft",
        })

        console.log("Printing the new course : ",newCourse);

        const updatedInstructor = await User.findByIdAndUpdate({_id:instructorDetails._id},
                                                                { $push : {
                                                                    courses:newCourse._id,
                                                                }},{new:true});

        

        const updatedCategory = await Category.findByIdAndUpdate({_id:category},
                                                        {$push:{
                                                            courses:newCourse._id,
                                                        }},{new:true});
                                                        
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Failed to create course",
        })
    }
}

exports.updateStatusOfCourse = async(req,res) => {

    try {
        const {courseId,status} = req.body;
        console.log("Req.body => ",req.body);

        const updatedCourse = await Course.findByIdAndUpdate(courseId,{status:status},{new:true}).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
            })
            .exec();

        return res.status(200).json({
            success:true,
            message:"Course Status added Successfully ",
            data:updatedCourse,
        })    

    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Failed to add course status ",
        })
    }
}

exports.getAllCourses = async(req,res) => {
    try{

        const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReview:true,
                                                 studentsEnrolled:true,}).populate("instructor").exec();


        return res.status(200).json({
            success:true,
            message:"Data for all course fetched successfully",
            allCourses
        })            
        
        

    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Failed to create course",
        })
    }
}

exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;
        console.log("Printing the course ID : ",courseId);
        console.log("Printing the req.body : ",req.body);
        const courseDetails = await Course.find({_id:courseId}).populate({
                                                                path:"instructor",
                                                                populate:{
                                                                    path:"additionalDetails",
                                                                    
                                                                }}).populate("category")
                                                                .populate("ratingAndReview")
                                                                .populate({
                                                                    path:"courseContent",
                                                                    populate:{
                                                                        path:"subSection",
                                                                    }
                                                                })
                                                                .populate({
                                                                  path:"instructor",
                                                                  populate:{
                                                                    path:"courses",
                                                                    populate:{
                                                                      path:"ratingAndReview"
                                                                    }
                                                                  }
                                                                }).exec();


        console.log("Printing the course details : ",courseDetails);                                                        

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"Course Details fetched succesfully",
            data:courseDetails,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })

      console.log("Printing the instructor courses : ",instructorCourses);
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }


exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    console.log("pritnifn thr req.body......................................................................",req.body);
    console.log("Printing the courseId....................................................................... : ",courseId);

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}


exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  console.log("Printing the courseID : ",courseId);
  console.log("Printing the userId : ",userId);

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    console.log("Hello jee me to yha hu >>>>>>>>");

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })


    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId)
    }

    // Save the updated course progress
    await courseProgress.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
