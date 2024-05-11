// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateStatusOfCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
  updateCourseProgress
} = require("../controllers/course")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSection")

// const {updateCourseProgress} = require("../controllers/courseProgress");

// Rating Controllers Import
const {
  createRatingAndReview,
  getAverageRating,
  getAllRatingAndReview,
} = require("../controllers/ratingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/updateStatus", auth, isInstructor, updateStatusOfCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.post("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);


//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails",auth,getFullCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReview)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReview)

module.exports = router