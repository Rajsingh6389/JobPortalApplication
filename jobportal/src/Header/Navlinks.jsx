import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navlinks() {
    const links = [
        { name: "Find Jobs", url: "/find-jobs" },
        { name: "Find Talent", url: "/find-talent" },
        { name: "Upload Job", url: "/upload-job" },
        {name:"view Applications", url:"/applications"},
        { name: "About Us", url: "/about" }
    ];
    const location=useLocation();
    return (
        <div className='flex gap-5 items-center text-mine-shaft-300 h-full'>
            {links.map((link, idx) => (
                <div key={idx} className={`${location.pathname ===link.url ? "border-bright-sun-400 text-bright-sun-400" : "border-transparent"}  px-2 py-1 rounded-md transition border-t-[3px] h-full flex items-center hover:border-bright-sun-400 hover:text-bright-sun-400`}>
                    <Link key={idx}  to={link.url} className='hover:animate-bounce'>{link.name}</Link>
                </div>
            ))}
        </div>
    )
}

export default Navlinks
