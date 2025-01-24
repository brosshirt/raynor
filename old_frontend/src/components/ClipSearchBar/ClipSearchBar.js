import React from 'react'
import './ClipSearchBar.css'

const ClipSearchBar = ({link, setLink, generateClip}) => {
  return (
    <div className='clipSearchBar'>
        <input 
            type={"text"} 
            className='articleLinkInput' 
            placeholder='Paste Article Link'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            />
        <button className='sendButton' onClick={generateClip}>Send</button>
    </div>
  )
}

export default ClipSearchBar
