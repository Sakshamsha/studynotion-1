import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link,matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {NavbarLinks} from "../../data/navbar-links"
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../../services/apiconnector';
import {courseEndpoints} from "../../services/apis"
// const subLinks = [
//     {
//         title: "python",
//         link:"/catalog/python"
//     },
//     {
//         title: "web dev",
//         link:"/catalog/web-development"
//     },
// ];

const Navbar = () => {

    const [loading,setLoading] = useState(false);
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const [subLinks, setSubLinks] = useState([]);

    useEffect(() => {
        ;(async () => {
          setLoading(true)
          console.log("Sublink length is ",subLinks.length);
          try {
            const res = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API);
            console.log("Printing the response : ",res);
            console.log("printing more : ",res.data);
            setSubLinks(res.data.allCategories);
            console.log("printing the sublinks :",subLinks);
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })()
      }, [])
    
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className=' flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900 fixed top-0 w-full z-10'>
        <div className=' flex w-11/12 max-w-maxContent item-center justify-between '>

            <Link to={'/'}>
                <img src={logo} width={160} height={42} loading='lazy' className=' my-auto' alt='Logo image' />
            </Link>

            <nav>
                
                <ul className='flex gap-x-6 text-richblack-25 mt-[10px] cursor-auto'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index} className=' cursor-auto'>
                                {
                                    link.title === "Catalog"?(
                            <div className='relative flex items-center gap-2 group'>
                                <p className=' cursor-pointer'>{link.title}</p>
                                <IoIosArrowDropdownCircle/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[15%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-25%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length>0 ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link
                                                    to={`/catalog/${subLink.name
                                                        .split(" ")
                                                        .join("-")
                                                        .toLowerCase()}`}
                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                    key={index}
                                                    >
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>


                            </div>

                        ):
                                    (
                                        <Link to={link?.path}>
                                            <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Login/Signup/Dashboard */}

            <div className=' flex gap-x-7 items-center'>

                {
                    user && user?.accountType!=="Instructor" && (
                        <Link to={"/dashboard/cart"} className=' relative'>
                            <AiOutlineShoppingCart className=' text-3xl text-richblack-100' />
                            {
                                totalItems > 0 && (
                                    <span className='absolute -bottom-0 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-50'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Log in
                            </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to="/signup">
                            <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown />
                }

            </div>
            

        </div>
    </div>
  )
}

export default Navbar