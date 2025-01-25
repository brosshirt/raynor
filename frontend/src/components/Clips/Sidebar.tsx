import React from 'react'
import ThreeDots from '../Utility/ThreeDots'
import PenPaper from '../Utility/PenPaper'
import MagnifyingGlass from '../Utility/MagnifyingGlass'

const Sidebar = () => {
  return (
    <ul className="menu bg-base-200 rounded-box w-56">
      <div className='flex flex-row-reverse'>
        <PenPaper/>
        <MagnifyingGlass/>
      </div>
      <li className='group'>
        <a><p>Clips 1/25</p><ThreeDots/></a>
      </li>
      <li className='group'>
        <a><p>Clips 1/24</p><ThreeDots/></a>
      </li>
      <li className='group'>
        <a><p>Clips 1/23</p><ThreeDots/></a>
      </li>
    </ul>
  )
}

export default Sidebar
