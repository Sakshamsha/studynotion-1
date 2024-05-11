const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const CourseProgress = require("../models/CourseProgress");
const mongoose = require("mongoose");

exports.capturePayment = async (req, res) => {
    const { courses } = req.body
    const userId = req.user.id

    if (courses.length === 0) {
      return res.json({ success: false, message: "Please Provide Course ID" })
    }
  
    let total_amount = 0

    console.log("Hello JEE ,YOUR MOST WELCOME IN CAPTURE PAYMENT ROUTE");
  
    for (const course_id of courses) {
      let course
      try {
        // Find the course by its ID
        course = await Course.findById(course_id)
  
        // If the course is not found, return an error
        if (!course) {
          return res
            .status(200)
            .json({ success: false, message: "Could not find the Course" })
        }

        console.log("type: ",typeof(userId));
  
        // Check if the user is already enrolled in the course
        const uid =  mongoose.Types.ObjectId.createFromHexString(userId);

        console.log("Printing typr of userID : ",typeof(uid));

        if (course.studentsEnrolled.includes(uid)) {
          return res
            .status(200)
            .json({ success: false, message: "Student is already Enrolled" })
        }
        console.log("And the name of th eperson who is making error is : ");
  
        // Add the price of the course to the total amount
        total_amount += course.price
      } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
      }
    }

    // var options = {
    //   amount: 50000,  // amount in the smallest currency unit
    //   currency: "INR",
    //   receipt: "order_rcptid_11"
    // };
    
    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    }
    
    console.log("Saksham Sharma and the name if yhe ushdqdeo.............",total_amount);
    try {
      // Initiate the payment using Razorpay
      const paymentResponse = await instance.orders.create(options);
      // const paymentResponse =instance.orders.create(options, function(err, order) {
      //   console.log(order);
      //   console.log("Also printing the error : ",err);
      // });

      console.log("Saksham Sharma and the name if yhe ushdqdeo22222222222222222");
      console.log("Printing the paymentResponse : ",paymentResponse);
      return res.json({
        success: true,
        data: paymentResponse,
      })

      console.log("This is the printing command for checking the error : ");
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ success: false, message: "Could not initiate order." })
    }
}


exports.verifyPayment = async (req, res) => {

    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId = req.user.id

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({ success: false, message: "Payment Failed" })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res)
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }

    return res.status(200).json({ success: false, message: "Payment Failed" })

}


exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
}

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)
  
        const courseProgress = await CourseProgress.create({
          courseId: courseId,
          userId: userId,
          completedVideos: [],
        })

        console.log("Printing the courseProgress : ",courseProgress);
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }


  // exports.capturePayment = async(req,res) =>{
//     try{
//         const {course_id} = req.body;
//         const userId = req.user.id;

//         if(!course_id){
//             return res.json({
//                 success:false,
//                 message:"Please,provide valid course id",
//             })
//         }

//         let course;

//         try{
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.status({
//                     success:false,
//                     message:"Could not find the course",
//                 });
//             }

//             const uid = new mongoose.Types.ObjectId(userId);
            
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student is already enrolled in the course",
//                 });
//             }
//         }
//         catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:"There is some error in capturing payment first try/block",
//             });
//         }

//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt:Math.random(Date.now().toString()),
//             notes : {
//                 courseId:course_id,
//                 userId,
//             }
//         } 

//         try{
//             //Initialise the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log("Payment Response is ",paymentResponse);

//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount,
//             });
//         }

//         catch(error){
//             return res.json({
//                 success:false,
//                 message:"Could not initiate order",
//             })
//         }
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"There is some error in capturing payment in last try/block",
//         });
//     }
// }

// exports.verifySignature = async(req,res) => {
//     try{
//         const webHookSecret = "12345678";
//         const signature = req.headers["x-razorpay-signature"];
//         const shasum = crypto.createHmac("sha256",webHookSecret);
//         shasum.update(JSON.stringify(req.body));

//         const digest = shasum.digest("hex");

//         if(signature === digest){
//             console.log("Payment is authorised");

//             const {courseId,userId} = req.body.payload.payment.entity.notes;
//             try {
//                 const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},
//                     {$push:{
//                         studentsEnrolled:userId,
//                     }},{new:true});

//                 if(!enrolledCourse){
//                 return res.status(500).json({
//                 success:false,
//                 message:"Course not found",
//                 });
//                 }
//                 console.log("Enrolled Course is : ",enrolledCourse);

//                 const enrolledStudent = await User.findByIdAndUpdate({_id:userId},
//                                     {$push:{
//                                         courses:courseId,
//                                     }},{new:true});

//                 console.log("Enrolled Student is ",enrolledStudent);

//                 const emailResponse = await mailSender(enrolledStudent.email,"StudyNotion || By Saksham",courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName));

//                 console.log("Email response is : ",emailResponse);

//                 return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course added Successfully",
//                 });
//             }

//             catch (error) {
//                 console.log("There is some error in updating course",error);
//                 return res.status(500).json({
//                     success:false,
//                     message:error.message,
//                 });
//             }
//         }
//         else{
//             return res.status(400).json({
//                 success:false,
//                 message:"Signatue and webhook does not match",
//             });
//         }
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"There is some error in verifying signature",
//         })
//     }
// }