import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import {FaCloudUploadAlt} from "react-icons/fa";
import { Player } from 'video-react';
import ReactPlayer from 'react-player'

const EditUpload = ({name,label,register,setValue,errors,video,file}) => {

    const [image,setImage] = useState(file);
    const [selectedImage,setSelectedImage] = useState(file);

    useEffect(() => {
        register(name, { required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [register])
    
      useEffect(() => {

        console.log("Printing the value of selected Image",selectedImage);
        setValue(name, selectedImage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [image,selectedImage, setValue])

    
    const ref = useRef(null);

    function handleClick(event){
        event.preventDefault();
        ref.current.click();
    }

    function handleOnChange(event){
        const files = event.target.files;
        console.log("Printing the value of files : ",files);
  
        const file = event.target.files[0];
        console.log("Printing the value of file : ",file);
        // setImage
        if(file){
          // setFile(file);
          setSelectedImage(file);
        }
        // setSelectedImage(file);
  
        const reader = new FileReader();
        
        const value1 = reader.readAsDataURL(file);
  
        console.log("Printing the value of value1 : ",value1);
  
        reader.onloadend = ()=>{
          const value2 = reader.result;
          console.log("Printing the value of value2 : ",value2);
          setImage(value2);
        }
      }


  
  return (
    <div>
        <div className=' flex flex-col gap-3'>
            <label className='text-sm text-richblack-5'>{label} <sup className="text-pink-200">*</sup></label>
            {

                
                image == null? <div className=' flex flex-col items-center gap-3 mt-2 min-h-[220px] max-h-[250px] bg-richblack-700 px-3 py-3 border-b-[1px] border-richblack-200 rounded-md'>
                    
                    <input id={name} type='file' className=' hidden max-w-max' ref={ref} onChange={handleOnChange} />
                    <FaCloudUploadAlt  className=" text-richblack-400" fontSize={100}/>
                    <button onClick={handleClick} className=' bg-yellow-300 font-bold text-white px-3 py-1 rounded-md  mx-auto'>Choose File </button>
                    {errors[name] && (
                            <span className="ml-2 mt-12 text-xs tracking-wide text-pink-200">
                            {label} is required
                            </span>
                    )}

                        
                </div>:<div className=' flex flex-col items-center'>
                    {!video ?
                     <img src={image}/>:
                     <ReactPlayer url={image} 
                      controls
                      
                     /> }
                    <button className=' text-richblack-100  underline' onClick={()=>setImage(null)}>Cancel</button>
                </div>
            }
        </div>
    </div>
  )
}

export default EditUpload