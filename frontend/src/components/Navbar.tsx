
import React from 'react'
import Image from 'next/image'



const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
        <a className="btn btn-ghost text-xl">CommsBot</a>
        <Image src='commsbot.svg' width={65} height={65} alt="logo"></Image>
        </div>
        <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
            <li><a>Clips</a></li>
            <li><a>Article Summary</a></li>
            <li><a>Chat with documents</a></li>
            <li><a href='https://www.youtube.com/watch?v=fPCEjURvaX0' target="_blank">Video of the week</a></li>
        </ul>
        </div>
    </div>
  )
}



export default Navbar
