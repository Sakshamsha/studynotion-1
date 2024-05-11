const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

exports.createRatingAndReview = async(req,res) => {
    try{
        const userId = req.user.id;

        console.log("Printing the rating and review body : ",req.body);
        const {rating,review,courseId} = req.body;
        const courseDetails = await Course.findOne({_id:courseId,
                                                    studentsEnrolled:{
                                                        $elemMatch:{
                                                            $eq:userId,
                                                        }
                                                    }})

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({user:userId,course:courseId});

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by user",
            });
        }

        const ratingReview = await RatingAndReview.create({rating,review,course:courseDetails._id,user:userId});

        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
                                                                    $push:{
                                                                        ratingAndReview:ratingReview._id,
                                                                    }},{new:true});

        console.log("Updated Course Details : ",updatedCourseDetails);
        
        return res.status(200).json({
            success:true,
            message:"Rating And Review created successfully",
        })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some error in creating Rating And Review",
        })
    }
}

exports.getAverageRating = async(req,res) => {
    try{
        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {$match :{
                course:new mongoose.Types.ObjectId(courseId),
            }},
            {$group:{
                _id:null,
                averageRating:{$avg:"$rating"},
            }}
        ])

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating is 0,no rating is given till now",
            averageRating:0,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some error in getting average Rating",
        })
    }
}

exports.getAllRatingAndReview = async(req,res) => {
    try {
        const allReview = await RatingAndReview.find({}).sort({rating:"desc"}).populate({
                                                                            path:"user",
                                                                            select:"firstName lastName email image",
        }).populate({
            path:"course",
            select:"courseName",
        }).exec();

        return res.status(200).json({
            success:true,
            message:"All review fetch successfully",
            data:allReview,
        });
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"There is some error in getting all Rating And Review",
        })
    }
}