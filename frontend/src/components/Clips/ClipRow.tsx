import React, {useState, useEffect} from 'react'
import CopyButton from '../Utility/CopyButton'
import { Trash } from 'lucide-react'
import { articleInfoToHtml } from '@/lib/clipFormatter'
import { Clip } from '@/db'
import UpArrow from '../Utility/UpArrow'
import DownArrow from '../Utility/DownArrow'


interface ClipRowProps {
    clip: Clip
    deleteClip: (articleLink:string) => void
    swapClips: (i: number, j:number) => void
    index: number
}

const ClipRow = ({clip, deleteClip, swapClips, index }: ClipRowProps) => {
  const [formattedClipHtml, setFormattedClipHtml] = useState<{ __html: string }>({__html: ''});

  const [errorReported, setErrorReported] = useState(false)

  useEffect(() => {
    if (clip) {
      const html = articleInfoToHtml(clip);
      setFormattedClipHtml(html);
    }
  }, [clip]);

  const handleCopy = () => {
    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([formattedClipHtml.__html], { type: 'text/html' }),
      'text/plain': new Blob([formattedClipHtml.__html], { type: 'text/plain' }),
    });
    navigator.clipboard.write([clipboardItem]);
  };


  const handleReportError = async (errorType: string) => {
    setErrorReported(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/error`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error_type: errorType,
        publication: clip!.publication,
        article_link: clip!.article_link,
        error_message: '',
      }),
    });
    const data = await res.json();
    setTimeout(() => setErrorReported(false), 1000)
    if (data.error){
      setTimeout(() => setErrorReported(false), 1000)
      throw new Error(data.error)
    }
    console.log('backend response', data)
  };
  
  
  return (
    <tr>
        <td className='max-w-96 relative'>
            <div className='' dangerouslySetInnerHTML={formattedClipHtml}></div>
            <CopyButton onCopy={handleCopy} className='btn-square btn-xs hover:bg-transparent absolute right-0 top-0' height='h-4' width='w-4'/>
        </td>
        <td><button className='btn btn-ghost' disabled={errorReported} onClick={() => handleReportError('link generation')}>🚩</button></td>
        <td><button className='btn btn-ghost' onClick={() => deleteClip(clip.article_link)}><Trash/></button></td>
        <td className=''>
          <div className='min-h-16 flex flex-col items-center justify-evenly'>
            <UpArrow onClick={() => swapClips(index, index - 1)} height='h-4' width='w-4' className=''/>
            <DownArrow onClick={() => swapClips(index, index + 1)} height='h-4' width='w-4' className=''/>
          </div>
        </td>
    </tr>
  )
}

export default ClipRow
