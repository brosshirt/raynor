"use client"
import React, {MouseEventHandler, SetStateAction, useState} from 'react'
import { db } from '@/db'



interface ThreeDotsProps {
  onRename: () => void
  onDelete: () => void
  onClear: () => void
}

const ThreeDots = ({onRename, onDelete, onClear }: ThreeDotsProps) => {




  const deployFuncWithoutPropogation = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>, func: () => void) => {
    e.stopPropagation()
    func()
  }

  
  
  return (
    <div  className="dropdown dropdown-right hover:bg-transparent">
      <div onClick={(e) => e.stopPropagation()} tabIndex={0}  role="button" className="btn btn-square btn-ghost hover:bg-transparent hover:text-neutral-content no-animation h-full">
        <svg
          tabIndex={0}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current outline-none">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><button onClick={(e) => deployFuncWithoutPropogation(e, onRename)}>Rename</button></li>
        <li><button onClick={(e) => deployFuncWithoutPropogation(e, onDelete)}>Delete</button></li>
        <li><button onClick={(e) => deployFuncWithoutPropogation(e, onClear)}>Clear</button></li>
      </ul>
    </div>
  )
}

export default ThreeDots
