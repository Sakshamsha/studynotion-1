const Category = require("../models/Category");

exports.createCategory = async(req,res) => {
    try{
        const {name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        console.log("I am in create category");

        const categoryDetials = await Category.create({name:name,description:description});

        console.log("Printing the course details is ",categoryDetials);

        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.showAllCategories = async(req,res) =>{
    try{
        const allCategories = await Category.find({},{name:true,description:true,});

        res.status(200).json({
            success:true,
            message:"All categories are returned successfully",
            allCategories,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.categoryPageDetails = async(req,res) => {
    try{
        const {categoryId} = req.body;
        const selectedCategory = await Category.findById(categoryId).populate({
            path: "courses",
            populate: {
                path: "instructor",
                path:"ratingAndReview"
            },

            }).exec();

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            });
        }

        const differentCategories = await Category.find({_id:{$ne:categoryId}})
        .populate(
            {path: "courses",
            populate: {
                path:"ratingAndReview"
            },}
        ).exec();
        
        const allCategories = await Category.find().populate({
                                                    path:"courses",
                                                    match:{status:"Published"},
                                                    populate:{
                                                        path:"instructor",
                                                        path:"ratingAndReview",
                                                    }    
        }).exec();

        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10);

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                mostSellingCourses,
            }
        })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"There is some error in category page details",
        });
    }
}

