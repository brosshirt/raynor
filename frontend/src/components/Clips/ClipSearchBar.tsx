'use client';
import { useState } from 'react';
import { Clip } from '@/db';
import { articleInfoToHtml } from '@/lib/clipFormatter';

interface ClipSearchBarProps {
  link: string;
  setLink: (value: string) => void;
  generateClip: () => void;
  clips: Clip[] | undefined
  isLoading: boolean
}

export default function ClipSearchBar({ link, setLink, generateClip, clips, isLoading }: ClipSearchBarProps) {
  const [isCopied, setIsCopied] = useState(false)
  
  const copyClips = async () => {
    if (!clips){
      return
    }
    
    let html = ''

    for (const clip of clips){
      html += articleInfoToHtml(clip).__html
      html += '<br/> <br/>'
    }

    console.log('html', html)

    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([html], { type: 'text/plain' }),
    });
    navigator.clipboard.write([clipboardItem]);

    setIsCopied(true)
    await setTimeout(() => setIsCopied(false), 1000)

  }
  
  
  return (
    <div className="flex gap-2 pt-10">
      <div className="form-control">
        <input type="text" disabled={isLoading} placeholder="Paste URL" className="input input-bordered w-72 h-8" value={link} onChange={e => setLink(e.target.value)}/>
      </div>
      <button
        onClick={generateClip}
        disabled={isLoading}
        className="btn btn-sm"
      >
        Get Clip
      </button>
      <button
        onClick={copyClips}
        disabled={isCopied}
        className="btn btn-sm"
      >
        {isCopied ? 'Copied' : 'Copy Clips'}
      </button>
    </div>
  );
}
