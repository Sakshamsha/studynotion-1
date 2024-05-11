import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { LuPlus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { formatDate } from "../../../services/formDate";
import {HiClock} from "react-icons/hi"
import {FaCheck} from "react-icons/fa";
import {FiEdit2} from "react-icons/fi"
// import {RiDeleteBin6Line} from "react-icons/ri"
import { deleteCourse, fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { Table,Tbody,Thead,Th,Tr,Td } from "react-super-responsive-table";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ConfirmationModal from "./ConfirmationModal";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading,setLoading] = useState(false);
  const [confirmationModal,setConfirmationModal] = useState(false);

  const fetchCourses = async () => {
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)

      console.log("Printing the course : ",courses);
    }
  }

  useEffect(() => {
    console.log("HEllo JEE KAISE HO");

    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteCourse = async(courseId) =>{
    // setLoading(true);
    const result = await deleteCourse(courseId,token);
    setConfirmationModal(null);
    fetchCourses();
  }

  return (
    <div className=" min-h-screen w-full text-richblue-500 bg-richblack-700">

      <div className=" mx-28 pt-7">
        <div className=" flex justify-between">
          <p className=" text-richblack-25 text-3xl">My Course</p>
          <button className=" flex bg-yellow-50 items-center font-bold gap-3 px-4 py-2 rounded-md"
          onClick={()=>navigate("/dashboard/add-course")}>
            Add Courses
            <FiPlus className=" font-bold"/>
          </button>
        </div>

        <div className=" mt-5">
          <Table className = "rounded-xl border border-richblack-700 mt-10 ">
            <Thead>
              <Tr className = "flex gap-x-10 rounded-t-md border-b border-b-richblack-700 px-6 py-2">
                <Th className = "flex-1 text-left text-sm font-medium uppercase text-richblack-100">Courses</Th>
                <Th className = "text-left text-sm font-medium uppercase text-richblack-100">Duration</Th>
                <Th className = "text-left text-sm font-medium uppercase text-richblack-100">Price</Th>
                <Th className = "text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
            {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-700 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      30
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, 30)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === "Draft" ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    onClick={ () => setConfirmationModal({
                                            text1: "Do you want to delete This course?",
                                            text2: "All The data related to This course will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: () => handleDeleteCourse(course._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
            </Tbody>

          </Table>
          {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
          }
        </div>
      </div>
    </div>
  )
}