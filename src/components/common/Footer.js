import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import {FooterLink2} from '../../data/footer-links'
import {AiFillHeart} from 'react-icons/ai'
import {FaRegCopyright} from "react-icons/fa"
// import {BiLogoFacebookCircle} from "react-icons"
// import {AiOutlineGoogle} from "react-icons"
// import {BiLogoTwitter} from "react-icons"
// import {BiLogoYoutube} from "react-icons"

const Footer = () => {

    console.log("Printing the footerLink-2 : ",FooterLink2);
  return (
    <div className=' w-[100%] bg-richblack-800 flex flex-col items-center justify-center gap-14 '>
        <div className=' w-11/12 max-w-maxContent mx-auto flex flow-row gap-7 pt-16'>

            {/* First part of the Footer */}
            <div className=' text-opacity-20 flex flex-row gap-10 border-r-[1px] border-richblack-700 pr-32'>
                <div className=' flex flex-col gap-3'>
                    <div>
                        <img src={Logo} alt='This is the image of logo of the StudyNotion'/>
                    </div>
                    <div className=' text-richblack-5 font-bold'>Company</div>
                    <div>
                        <Link to={"/about"}>
                            <div className=' hover:text-richblack-25 text-richblack-300 text-[15px]'>About</div>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/careers"}>
                            <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Careers</div>
                        </Link>
                    </div>
                    <div>
                        <Link to={"/affiliates"}>
                            <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Affiliates</div>
                        </Link>
                    </div>

                    {/* <div>
                        <BiLogoFacebookCircle/>
                        <AiOutlineGoogle/>
                        <BiLogoTwitter/>
                        <BiLogoYoutube/>
                    </div> */}

                </div>

                <div className='flex flex-col gap-7'>
                    <div className=' flex flex-col gap-3'>
                        <div className=' text-richblack-5 font-bold'>Resourses</div>
                        <div>
                            <Link to={"/articles"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Articles</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/blog"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Blog</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/chartSheet"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Chart Sheet</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/codeChallenges"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Code Challenges</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/docs"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Docs</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/projects"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Projects</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/videos"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Videos</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/workspaces"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Workspaces</div>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className=' text-richblack-5 font-bold'>Support</div>
                        <div>
                            <Link to={"/helpCenter"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Help Center</div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className=' ml-10 flex flex-col gap-7'>
                    <div className='flex flex-col gap-3'>
                        <div className=' text-richblack-5 font-bold'>Plans</div>
                        <div>
                            <Link to={"/paidMemberships"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Paid memberships</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/forStudents"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>For students</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/businessSolutions"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Business solutions</div>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className=' text-richblack-5 font-bold'>Community</div>
                        <div>
                            <Link to={"/forums"}>
                                <div  className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Forums</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/chapters"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Chapters</div>
                            </Link>
                        </div>
                        <div>
                            <Link to={"/events"}>
                                <div className='hover:text-richblack-25 text-richblack-300 text-[15px]'>Events</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second part of the footer */}
            <div className=' flex flex-row gap-16'>
                {
                    FooterLink2.map((element,index)=>{
                        return <div key={index}>
                            <div className=' text-richblack-5 font-bold mb-3'>{element.title}</div>
                            <div className=' flex flex-col gap-3'>
                                {
                                     element.links.map((subjects,ind)=>{
                                        return <div key={ind}>
                                            <Link to={subjects.link}>
                                            <div className=' hover:text-richblack-25 text-richblack-300 text-[15px]'>
                                                {subjects.title}
                                            </div>
                                            </Link>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

        <div className=' w-11/12 max-w-maxContent mx-auto'>
                <div className=' h-[1px] bg-richblack-700'></div>
        </div>

        <div className=' w-11/12 max-w-maxContent mx-auto flex flex-row justify-between mb-10'>

            <div className=' flex flex-row gap-2'>
                <div>
                    <Link to={"/privacy-policy"}>
                        <div className=' hover:text-richblack-25 text-richblack-300 text-[15px]'>Privacy Policy</div>
                    </Link>
                </div>
                <div>
                    <Link to={"/cookie-policy"}>
                        <div className=' hover:text-richblack-25 text-richblack-300 text-[15px] pl-[5px] border-l-[0.7px] border-richblack-700'>Cookie Policy</div>
                    </Link>
                </div>
                <div>
                    <Link to={"/terms"}>
                        <div className=' hover:text-richblack-25 text-richblack-300 text-[15px] pl-[5px] border-l-[0.7px] border-richblack-700'>Terms</div>
                    </Link>
                </div>
            </div>

            <div className=' flex flex-row'>
                <div className=' flex flex-row items-center gap-1 text-richblack-300 text-[15px]'>Made with <AiFillHeart color='red'/> CodeHelp <FaRegCopyright/> 2023 Studynotion</div>
            </div>
        </div>
    </div>
  )
}

export default Footer