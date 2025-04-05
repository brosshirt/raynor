'use client';
import { useState } from 'react';
import { Clip } from '@/db';
import { clipListToHtml } from '@/lib/clipFormatter';
import { copyToClipboard } from '@/lib/genLib';

interface ClipSearchBarProps {
  link: string;
  setLink: (value: string) => void;
  generateClip: () => void;
  addEmptyClip: () => void;
  clips: Clip[] | undefined
  isLoading: boolean
}

export default function ClipSearchBar({ link, setLink, generateClip, addEmptyClip, clips, isLoading }: ClipSearchBarProps) {
  const [isCopied, setIsCopied] = useState(false)
  
  const copyClips = async () => {
    if (!clips){
      return
    }
    
    const html = clipListToHtml(clips).__html

    copyToClipboard(html)


    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)

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
        onClick={addEmptyClip}
        className="btn btn-sm"
      >
        Add Empty Clip
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
