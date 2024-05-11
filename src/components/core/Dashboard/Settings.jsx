import React, { useRef } from 'react'
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {BiUpload} from "react-icons/bi"
import { updateDisplayPicture,updateProfile,updatePassword,deleteAccount } from '../../../services/operations/settingApi';
import { useNavigate } from 'react-router-dom';
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai"



const Settings = () => {

    const {user} = useSelector((state)=>state.profile);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);

    const [selectedImage,setSelectedImage] = useState(null);
    const [imageUpload,setImageUpload] = useState(null);

    const [showCurrentPassword,setShowCurrentPassword] = useState(false);
    const [showNewPassword,setShowNewPassword] = useState(false);
    const navigate = useNavigate();

    const [currentPassword,setCurrentPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");

    const ref = useRef(null);
    
    function handleOnClick(){
      ref.current.click();
    }

    function handleOnChange(event){
      const files = event.target.files;
      console.log("Printing the value of files : ",files);

      const file = event.target.files[0];
      console.log("Printing the value of file : ",file);
      // setSelectedImage(file);/

      if(file){
        setImageUpload(file);
      }

      const reader = new FileReader();
      
      const value1 = reader.readAsDataURL(file);

      console.log("Printing the value of value1 : ",value1);

      reader.onloadend = ()=>{
        const value2 = reader.result;
        // console.log("Printing the value of value2 : ",value2);
        setSelectedImage(value2);
      }
    }

    function handleFileUpload(){
      try {
        
        console.log("Uploading...");
        setLoading(true);
        console.log("pro=inting accountType : ",user.accountType);
        const formData = new FormData();

        console.log("printing the image upload : ",imageUpload);

        console.log("printing the type of image upload : ",typeof(imageUpload));
        formData.append("displayPicture",imageUpload);

        console.log("printing the form data : ",formData);

        dispatch(updateDisplayPicture(token,formData)).then(()=>{
          setLoading(false);
        })
      } catch (error) {

        console.log("There is some error in handleFileUpload Function : ",error);
        
      }
    }

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
    }

    useEffect(() => {
      if (imageUpload) {
        previewFile(imageUpload)
      }
    }, [imageUpload])

    const [formData1,setFormData1] = useState({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      contactNumber: "",
      about: "",
    })

    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      contactNumber,
      about
    } = formData1;


    const handleOnChangeForm = (e) => {
      console.log("Printing target :",e.target);
      console.log("Printing target name :",e.target.name);
      console.log("Printing target value :",e.target.value);
      setFormData1((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))

      console.log("Gender : ",gender);
  }

  function handleOnSubmit(e){
    e.preventDefault();
    try {
        
      console.log("I am under handle On Submit");

      dispatch(updateProfile(token,formData1)).then(()=>{
        console.log("Updated successfully");
      })
    } catch (error) {

      console.log("There is some error in handleSubmit Function : ",error);
      
    }
  } 

  function handleOnSubmitPassword(){
    const formData2 = new FormData();

    formData2.append("oldPassword",currentPassword);
    formData2.append("newPassword",newPassword);
    formData2.append("confirmNewPassword",newPassword);
    
    try {
        
      console.log("I am under handle On Submit password");

      dispatch(updatePassword(token,formData2)).then(()=>{
        console.log("Updated successfully");
      })
    } catch (error) {

      console.log("There is some error in handleSubmit Function : ",error);
      
    }
  }


  function handleDelete(){
    
    try {
        setLoading(true);
      console.log("I am under deleting");

      dispatch(deleteAccount(token,navigate));
      setLoading(false);
    
    } catch (error) {

      console.log("There is some error in delete Function : ",error);
      
    }
  }



  return (
    <div className=' bg-richblack-700 w-full pb-20'>

        {/* Heading */}
        <div className=' text-3xl pt-7 text-richblack-5 ml-32'>Edit Profile</div>

        {/* First Block */}
        <div className=' border-[0.5px] border-richblack-600 rounded-md bg-richblack-800 w-[80%] mx-auto mt-10 flex items-center justify-between p-9'>
            <div className=' flex flex-row gap-5 items-center'>
                <img src={selectedImage || user.image} alt='This is the image of the user' width={70} className=' rounded-full'/>
                <div className=' flex flex-col gap-2'>
                  <div className=' text-richblack-5'>Change Profile Picture</div>
                  <input
                    type='file'
                    className=' hidden'
                    accept='.jpg,.jpeg'
                    ref={ref}
                    onChange={handleOnChange}
                  />

                  <div className=' flex flex-row gap-3'>
                    <button onClick={handleOnClick}
                    className=' bg-richblack-400 py-2 px-6 font-bold text-richblack-50 rounded-md'>Select</button>
                    <button onClick={handleFileUpload}
                    className=' bg-yellow-50 py-2 px-6 rounded-md'>
                      <div className=' flex items-center gap-2'>
                          <p className=' font-bold'>
                            {
                              loading?"Uploading...":"Upload"
                            }
                          </p>
                          {
                            !loading && <BiUpload/>
                          }
                      </div>
                    </button>
                  </div>
                  
                </div>
            </div>
        </div>

        {/* Second block */}
        <div className=' border-[0.5px] border-richblack-600 rounded-md bg-richblack-800 w-[80%] mx-auto mt-10 flex flex-col justify-between p-12 pr-20'>
            <div className=' text-richblack-5 font-bold text-[18px]'>Profile Information</div>

            <form  className=' w-[100%] mt-7 flex flex-col gap-5'>

                  {/* First Line */}
                 <div className=' flex w-[100%] justify-between'>
                     <label className=' w-[48%] flex flex-col gap-2'>
                          <p className=' text-richblack-5 text-[14px]'>First Name</p>
                          <input
                            required
                            type='text'
                            name='firstName'
                            id='firstName'
                            onChange={handleOnChangeForm}
                            placeholder='Enter first name'
                            className=' bg-richblack-500 w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5'
                            value={firstName}
                          />
                     </label>     

                     <label className=' w-[48%] flex flex-col gap-2'>
                          <p className=' text-richblack-5 text-[14px] '>Last Name</p>
                          <input
                            required
                            type='text'
                            name='lastName'
                            id='lastName'
                            onChange={handleOnChangeForm}
                            placeholder='Enter last name'
                            className=' bg-richblack-500 w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5'
                            value={lastName}
                          />
                     </label>     
                 </div>    


                 <div className=' flex w-[100%] justify-between'>
                     <label className=' w-[48%] flex flex-col gap-2'>
                          <p className=' text-richblack-5 text-[14px]'>Date of Birth</p>
                          <input
                            required
                            type='date'
                            name='dateOfBirth'
                            id='dateOfBirth'
                            onChange={handleOnChangeForm}
                            placeholder='dd-mm-yyyy'
                            className=' bg-richblack-500  w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5'
                            value={dateOfBirth}
                          />
                     </label>     

                     <label className=' w-[48%] flex flex-col gap-2'>
                          <p className=' text-richblack-5 text-[14px]'>Gender</p>
                          <select name="gender" id="gender" onChange={handleOnChangeForm} value={gender} className='bg-richblack-500  w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-Binary">Non-Binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                            <option value="Other">Other</option>
                          </select>
                     </label>     
                 </div>

                 <div className=' flex w-[100%] justify-between'>
                     <label className=' w-[48%] flex flex-col gap-2'>
                          <p className=' text-richblack-5 text-[14px]'>Contact Number</p>
                          <input
                            required
                            type='number'
                            name='contactNumber'
                            id='contactNumber'
                            onChange={handleOnChangeForm}
                            placeholder='Enter Contact Number'
                            className=' bg-richblack-500 w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5'
                            value={contactNumber}
                          />
                     </label>     

                     <label className=' w-[48%] flex flex-col gap-2'>
                        <p className=' text-richblack-5 text-[14px]'>About</p>
                          <input
                            required
                            type='text'
                            name='about'
                            id='about'
                            onChange={handleOnChangeForm}
                            placeholder='Enter Bio Details'
                            className=' bg-richblack-500 w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5'
                            value={about}
                          />
                     </label>   


                 </div>     
            </form>
        </div>

        <div className=' flex flex-row gap-3 ml-[975px] mt-10'>
          <button type='submit'
           className=' text-white bg-richblack-800 px-5 py-2 rounded-md font-bold'
            onClick={()=>navigate("/dashboard/my-profile")}>Cancel</button>    
          <button type='submit' className='text-richblack-900 bg-yellow-50 px-5 py-2 rounded-md font-bold' onClick={handleOnSubmit}>Save</button>    
        </div>

        {/* This is password Block */}
        <div className=' border-[0.5px] border-richblack-600 rounded-md bg-richblack-800 w-[80%] mx-auto mt-10 flex flex-col gap-5 justify-between p-9'>
            <div className=' text-richblack-5 font-bold'>Password</div>              
            <div className=' w-[100%] flex flex-row gap-5'>
              <label className=' w-[48%] flex flex-col gap-2 relative'>
                <p className=' text-richblack-5 text-[14px]'>Current Password</p>
                <input
                    required
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e)=>setCurrentPassword(e.target.value)}
                    placeholder="Enter Current Password"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="bg-richblack-500 w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5"
                />
                <span
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-[40px] z-[10] cursor-pointer"
                >
                    {showCurrentPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
              </label>

              <label className=' w-[48%] flex flex-col gap-2 relative'>
                <p className=' text-richblack-5 text-[14px]'>New Password</p>
                <input
                    required
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="bg-richblack-500 w-[100%] py-3 px-3 rounded-md border-b-[1px] border-richblack-50 inp text-richblack-5"
                />
                <span
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-[40px] z-[10] cursor-pointer"
                >
                    {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
              </label>
            </div>
        </div>

        <div className=' flex flex-row gap-3 ml-[975px] mt-10'>
          <button type='submit'
           className=' text-white bg-richblack-800 px-5 py-2 rounded-md font-bold'
            onClick={()=>navigate("/dashboard/my-profile")}>Cancel</button>    
          <button type='submit' className='text-richblack-900 bg-yellow-50 px-5 py-2 rounded-md font-bold' onClick={handleOnSubmitPassword}>Update</button>    
        </div>

        <div className=' border-[0.5px] border-pink-100 rounded-md bg-pink-800 w-[80%] mx-auto mt-10 flex gap-5 p-9'>

          <div className=' bg-pink-700 p-2 rounded-full h-fit'>
            <AiFillDelete fontSize={32} className=" text-pink-200 "/>
          </div>  

          <div>
            <div className=' text-richblack-5 font-bold text-[18px]'>Delete Account</div>
            <div className=' text-richblack-50 mt-2'>Would you like to delete account?</div>
            <div className=' text-richblack-50'>This account may contain Paid Courses. Deleting your account is</div>
            <div className=' text-richblack-50'>permanent and will remove all the contain associated with it.</div>

            <button onClick={handleDelete} className=' mt-3 bg-pink-300 py-3 px-5 border-[1px] border-pink-50'>
              {
                loading?"Deleting Account":"I want to delete my account"
              }
            </button>
          </div>
              
        </div>
        
    </div>
  )
}

export default Settings