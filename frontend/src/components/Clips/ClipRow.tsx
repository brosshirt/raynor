import React from 'react'


interface ClipRowProps {
    formattedClipHtml: { __html: string},
}

const ClipRow = ({formattedClipHtml}: ClipRowProps) => {
  return (
    <tr>
        <td dangerouslySetInnerHTML={formattedClipHtml}></td>
        <td><button className='btn btn-ghost'>🚩</button></td>
        <td><button className='btn btn-ghost'>🚩</button></td>
    </tr>
  )
}

export default ClipRow
