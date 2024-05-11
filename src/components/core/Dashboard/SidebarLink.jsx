import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';


const SidebarLink = ({link,iconName}) => {

    const Icon = Icons[iconName];
    const location  = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <NavLink
    to={link.path}
    className={ ` flex flex-row items-center py-2 pl-7 font-medium ${matchRoute(link.path) ? " border-l-4 border-l-yellow-25 bg-yellow-800" :"bg-opacity-0"}`}
    >
        <div className='flex item-center gap-x-2'>

            <Icon className={`${matchRoute(link.path)?" text-yellow-50":" text-richblack-300"}`} />
            <span className={` text-[15px] ${matchRoute(link.path)?" text-yellow-50":" text-richblack-300"}`}>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink