import React from 'react'

interface PenPaperProps{
  onClick: () => void
}

const PenPaper = ({onClick}: PenPaperProps) => {
  return (
    <button onClick = {onClick}className="btn btn-ghost">
        <svg 
            width="18" height="18" 
            viewBox="0 0 48 48" 
            className="w-5 h-5" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M7 42H43" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="butt" 
                strokeLinejoin="bevel">
            </path>
            <path 
                d="M11 26.7199V34H18.3172L39 13.3081L31.6951 6L11 26.7199Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinejoin="bevel">
            </path>
        </svg>
    </button>

  )
}

export default PenPaper
