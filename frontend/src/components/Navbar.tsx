import React from 'react'



const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
        <a className="btn btn-ghost text-xl">CommsBot</a>
        </div>
        <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
            <li><a>Clips</a></li>
            <li><a>Article Summary</a></li>
            <li><a>Chat with documents</a></li>
            <li><a>Funny video of the week</a></li>
        </ul>
        </div>
    </div>
  )
}



export default Navbar
