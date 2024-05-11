const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudianry = async(file,folder,height,quality) => {

    console.log("Now we are in the uploadImageToCloudinary ");
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    console.log("Now we are in the uploadImageToCloudinary-2 ");



    return await cloudinary.uploader.upload(file.tempFilePath,options);
}