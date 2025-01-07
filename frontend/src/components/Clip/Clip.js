import React, {useState, useEffect} from 'react'
import './Clip.css'
import { articleInfoToHTML } from '../../logic/clipFormatter'



const Clip = ({clip, reportError}) => {
  const [formattedClipHTML, setFormattedClipHTML] = useState('')

  useEffect(() => {
    if (clip){
        const html = articleInfoToHTML(clip)
        setFormattedClipHTML(html)
    }
  }, [clip])

  const handleCopy = () => {
    console.log('handling copy')
    const clipboardItem = new ClipboardItem({ 
        'text/html': new Blob([formattedClipHTML], { type: 'text/html' }),
        'text/plain': new Blob([formattedClipHTML], { type: 'text/plain' })
    });
      
    navigator.clipboard.write([clipboardItem])
};



  return (
    <div className="clipDisplay">
        <span id="textToCopy" dangerouslySetInnerHTML={{ __html: formattedClipHTML }}></span>
        <button className='copy' onClick={handleCopy}>Copy</button>
        <button className='flag' onClick={() => reportError(clip)}>🚩</button>
    </div>
  )
}

export default Clip
