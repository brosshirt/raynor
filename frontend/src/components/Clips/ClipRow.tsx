import React from 'react'
import CopyButton from '../Utility/CopyButton'


interface ClipRowProps {
    formattedClipHtml: { __html: string},
    onCopy: () => void
    reportError: (errorType: string) => void
}

const ClipRow = ({formattedClipHtml, onCopy, reportError}: ClipRowProps) => {

  
  
  return (
    <tr>
        <td className='w-96 relative'>
            <div className='' dangerouslySetInnerHTML={formattedClipHtml}></div>
            <CopyButton onCopy={onCopy}/>
        </td>
        <td><button className='btn btn-ghost' onClick={() => reportError('copy paste')}>🚩</button></td>
        <td><button className='btn btn-ghost' onClick={() => reportError('link generation')}>🚩</button></td>
    </tr>
  )
}

export default ClipRow
