import React from 'react'
import Sidebar from './Sidebar'
import ClipsMainContent from './ClipsMainContent'

const Clips = () => {
  return (
    <div className='w-screen flex h-[100%] gap-8'>
      <Sidebar/>
      <ClipsMainContent/>
    </div>
  )
}
 
export default Clips
