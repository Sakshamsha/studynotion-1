const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const mongoose= require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const {uploadImageToCloudianry} = require("../utils/imageUploader");
const { convertSecondsToDuration }  =  require("../utils/secToDuration");

exports.updateProfile = async(req,res) => {
    try{
        const {dateOfBirth = "",about = "",contactNumber,gender} = req.body;
        console.log('jo');
        console.log("req",req.user.id);
        const id = req.user.id;

        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // console.log("Hi");
        // console.log("This",typeof(mongoose.Types.ObjectId(id)));

        // const newId = mongoose.Types.ObjectId(id);
        // console.log("Type of",newId);

        const userDetails = await User.findById(id);
        // console.log("I am in");
        // console.log("I am in this area");
        console.log(userDetails);
        console.log("first",userDetails.additionalDetails);
        const profileId = userDetails.additionalDetails;
        console.log("And the ");
        const profileDetails = await Profile.findById(profileId);

        console.log("Printing the profile details",profileDetails);

        console.log("This is ");

        console.log("And the name of");

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about = about;
        profileDetails.gender = gender;

        console.log("Updated Profile Details",profileDetails);

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        })
        
    }
    catch(error){
        console.log("There is some error in updateProfile");
        return res.status(500).json({
            success:false,
            message:"There is some error in updating profile",
        })
    }
}

exports.deleteAccount = async(req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id);
        console.log("This is user details that are fetched from the id : ",userDetails);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        for (const courseId of userDetails.courses) {
          const data = await Course.findByIdAndUpdate(
            courseId,
            { $pull: { studentsEnroled: id } },
            { new: true }
        )
        }

        await User.findByIdAndDelete({_id:id});
        await CourseProgress.deleteMany({ userId: id })
        // const updatdedCourse = await Course.findByIdAndUpdate()
        

        return res.status(200).json({
            success:true,
            message:"User account and its profile has been deleted successfully",
        })
    }
    catch(error){
        console.log("There is some error in deleteProfile");
        return res.status(500).json({
            success:false,
            message:"There is some error in deleting profile",
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;

    console.log("printing the id : ",id);
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      console.log("Value of display Picture : ",displayPicture);
      console.log("This is the block after display Picture");
      console.log("This -> ",req.user);
      const userId = req.user.id;
      
      console.log("type : ",typeof(userId));
      console.log("Printing the value of user Id : ",userId);
      const image = await uploadImageToCloudianry(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image);
      const doc = await User.findById(userId);
      console.log("Value of User : ",doc);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      console.log("Hi");
      console.log("Updated Profile : ",updatedProfile);
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })

      console.log("This is th elast line of image updation controller");
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id

      console.log('I am in the getEnrolledCourses ');
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec();

        userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    console.log("Printing the courseDetails in Server Side : ",courseDetails);

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}