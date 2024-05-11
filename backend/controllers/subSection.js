const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudianry} = require("../utils/imageUploader"); 
const Course = require("../models/Course");

exports.createSubSection = async(req,res) => {
    try{

        
        console.log("Printing the req.body : ",req.body);
        console.log("Printing the req.files : ",req.files);
        const {courseId,sectionId,title,description,timeDuration} = req.body;
        // const sectionId = req.body.lectureModal;

        const video = req.files.videoFile;
        if(!sectionId || !title || !description || !timeDuration || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are require to create subSection",
            });
        }

        const uploadDetails = await uploadImageToCloudianry(video,process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:uploadDetails.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                                {$push:{
                                                                    subSection:subSectionDetails._id,
                                                                }},{new:true});


        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
            }).exec();                                                        




        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updatedCourse,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some issue in creating SubSection",
            error:error.message,
        })
    }
}

exports.updateSubSection = async(req,res) => {
    try{

        const {courseId,subSectionId,title,description,timeDuration} = req.body;
        console.log("printing the req.files : ",req.files);
        console.log("printing the req.body : ",req.body);
        const video =  req.files.videoFile;

        //data validation
        if(!subSectionId || !title || !description || !timeDuration || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required to update the SubSection",
            });
        }

        const videoUploader = await uploadImageToCloudianry(video,process.env.FOLDER_NAME);

        const updatedSection = await SubSection.findByIdAndUpdate(subSectionId,
                                                                {title,description,timeDuration,videoUrl:videoUploader.secure_url},{new:true});

        

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
            }).exec();         

        return res.status(200).json({
            success:true,
            message:"Subsection updated successfully",
            updatedCourse,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some issue in updating subSection",
            error:error.message,
        })
    }
}

exports.deleteSubSection = async(req,res)=>{
    try {
        
        const {subSectionId,sectionId,courseId} = req.body;
        console.log("SubSection ID : ",subSectionId);

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
                                                                $pull:{
                                                                    subSection:subSectionId,
                                                                }
        })
        await SubSection.findByIdAndDelete(subSectionId);

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
            }).exec();    

        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
            updatedCourse,
        });

    } catch (error) {
        return res.status(400).json({
                success:false,
                message:"There is some error in deleting SubSection",
            });
    }
}