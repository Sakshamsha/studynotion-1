import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import {sidebarLinks} from "../data/dashboard-links"
import SidebarLink from '../components/core/Dashboard/SidebarLink'
import {logout} from "../services/operations/authApi"
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from '../components/core/Dashboard/ConfirmationModal'

const Dashboard = () => {

    const {loading:authLoading} = useSelector((state)=>state.auth)
    const {user,loading:profileLoading} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal,setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){
        return <div>
            Loading...
        </div>
    }

    console.log("Printing the user in dashboard : ",user);

    // useEffect(()=>{
    //     if(user){
    //         console.log("Printing the user in Dashboard : ",user);
    //     }
    // },[user])


  return (
    <div className=' w-full flex flex-row mt-16'>
        <div className=' fixed bg-richblack-900 h-screen w-[220px] '>

            {/* sidebarLinks */}
            <div className=' mt-10 flex flex-col gap-2'>
                {
                    sidebarLinks.map((element)=>{
                        if(element.type && user.accountType !== element.type){
                             return null;
                        }
                        else{
                            return (
                                <SidebarLink key={element.id} link={element} iconName={element.icon}/>
                            )
                        }
                })
                }

            </div>

            {/* Horizontal Line */}
            <div className=' h-[0.1px] mt-10 w-[180px] bg-richblack-300 mx-auto'></div>

            <div className=' mt-10'>
                <SidebarLink
                     link={{name:"Settings", path:"dashboard/settings"}}
                     iconName="VscSettingsGear"
                />
            </div>


            <button 
                onClick={ () => setConfirmationModal({
                    text1: "Are You Sure ?",
                    text2: "You will be logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                })}
                className=' w-full text-sm font-medium text-richblack-300 flex flex-row items-center py-2 pl-7 cursor-pointer'>

                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>
            </button>

        </div>

        <div className=' w-[calc(100vw-205px)] ml-52'>
            <Outlet/>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
    
  )
}

export default Dashboard