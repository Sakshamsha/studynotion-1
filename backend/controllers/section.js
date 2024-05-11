const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async(req,res) => {
    try{
        const {sectionName,courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Please,fill all the details !!",
            });
        }

        //create the section

        const newSection = await Section.create({sectionName});

        const updatedCourse = await Course.findByIdAndUpdate(courseId,
                                                            {$push : {
                                                                courseContent:newSection._id,
                                                            }},{new:true}).populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                    path: "subSection",
                                                                },
                                                            })
        .exec();

        
        
        
                                                            




        return res.status(200).json({
            success:true,
            message:'Section created Successfully',
            updatedCourse
        })

                                                            
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some issue in creating section",
            error:error.message,
        })
    }
}

exports.updateSection = async(req,res) => {
    try{
        const {sectionName,sectionId,courseId} = req.body;

        console.log("printing the req.body : ",req.body);

        //data validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"All fields are required to update the section",
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                                {sectionName},{new:true});

        
        const updatedCourse = await Course.findByIdAndUpdate(courseId).populate({
                                                        path: "courseContent",
                                                        populate: {
                                                            path: "subSection",
                                                        },
                                                        })
                                                        .exec();

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updatedSection,
            updatedCourse,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some issue in updating section",
            error:error.message,
        })
    }
}

exports.deleteSection = async(req,res) => {
    try{
        const {sectionId,courseId} = req.body;

        console.log("pritnitn the req.body : ",req.body);

        const section = await Section.findById(sectionId);
        // await SubSection.deleteMany({_id: {$in: section.subSection}});
        await Section.findByIdAndDelete(sectionId);

        console.log("Hello Now I am deleting the section : ");

        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
         }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
            })
            .exec();

        console.log("printing the course : ",updatedCourse);    

            

        return res.status(200).json({
            success:true,
            message:"Section Deleted successfully",
            updatedCourse,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some issue in deleting section",
            error:error.message,
        })
    }
}