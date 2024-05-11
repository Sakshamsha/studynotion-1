import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className=' fixed inset-0 z-10  grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className=' bg-richblack-900 p-5 border-[3px] border-richblack-500 rounded-md opacity-100'>
            <div className=' text-2xl text-richblack-5 font-semibold'>{modalData.text1}</div>
            <div className=' mt-3 text-richblack-300 '>{modalData.text2}</div>
            <div className=' flex gap-3 mt-5'>
                <button onClick={modalData.btn1Handler} className=' rounded-md font-bold py-2 px-4 bg-yellow-50 '>{modalData.btn1Text}</button>
                <button onClick={modalData.btn2Handler} className='rounded-md font-bold py-2 px-4 bg-richblack-300'>{modalData.btn2Text}</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal