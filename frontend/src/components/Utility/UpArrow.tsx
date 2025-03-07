import React from 'react'


interface UpArrowProps {
    onClick: () => void
    height: number
    width: number
    className: string
}


const UpArrow = ({onClick, height, width, className}: UpArrowProps) => {
  return (
    <button className={`btn btn-ghost btn-xs ${className}`} onClick={onClick}>
      <svg 
        className={`h-${height} w-${width}`}
        xmlns="http://www.w3.org/2000/svg" 
	    viewBox="0 0 511.947 511.947">
        <path d="M476.847,216.373L263.513,3.04c-4.267-4.053-10.88-4.053-15.04,0L35.14,216.373c-4.16,4.16-4.16,10.88-0.107,15.04
            c2.027,2.027,4.8,3.2,7.573,3.2h128V501.28c0,5.867,4.8,10.667,10.667,10.667h149.333c5.867,0,10.667-4.8,10.667-10.667V234.613
            h128c5.867,0,10.667-4.8,10.667-10.667C479.94,221.067,478.873,218.4,476.847,216.373z M330.607,213.28
            c-5.867,0-10.667,4.8-10.667,10.667v266.667h-128V223.947c0-5.867-4.8-10.667-10.667-10.667H68.42L255.94,25.547L443.567,213.28
            H330.607z"/>
        </svg>
    </button>
  )
}

export default UpArrow
