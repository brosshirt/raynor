'use client';
import React from 'react';
import { Clip } from '@/db';
import { articleInfoToHtml } from '@/lib/clipFormatter';

interface ClipSearchBarProps {
  link: string;
  setLink: (value: string) => void;
  generateClip: () => void;
  clips: Clip[] | undefined
}

export default function ClipSearchBar({ link, setLink, generateClip, clips }: ClipSearchBarProps) {
  
  
  const copyClips = () => {
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

  }
  
  
  return (
    <div className="flex gap-2 pt-10">
      <div className="form-control">
        <input type="text" placeholder="Paste URL" className="input input-bordered w-72 h-8" value={link} onChange={e => setLink(e.target.value)}/>
      </div>
      <button
        onClick={generateClip}
        className="btn btn-sm"
      >
        Get Clip
      </button>
      <button
        onClick={copyClips}
        className="btn btn-sm"
      >
        Copy Clips
      </button>
    </div>
  );
}
