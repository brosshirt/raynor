'use client';
import React, { useState, useEffect } from 'react';
import { articleInfoToHTML } from '@/lib/clipFormatter';
import { ArticleInfo } from '@/lib/types';


interface ClipProps {
  clip: ArticleInfo | undefined;
  reportError: (clip: ArticleInfo, errorType: string) => void;
}

export default function Clip({ clip, reportError }: ClipProps) {
  const [formattedClipHTML, setFormattedClipHTML] = useState('');

  useEffect(() => {
    if (clip) {
      const html = articleInfoToHTML(clip);
      setFormattedClipHTML(html);
      console.log('formattedCliphtml', html)
    }
  }, [clip]);

  const handleCopy = () => {
    const clipboardItem = new ClipboardItem({
      'text/html': new Blob([formattedClipHTML], { type: 'text/html' }),
      'text/plain': new Blob([formattedClipHTML], { type: 'text/plain' }),
    });
    navigator.clipboard.write([clipboardItem]);
  };

  return (
    <div className="border border-black rounded w-full h-1/2 flex items-center gap-2 p-2">
      <span className="flex-[10]" dangerouslySetInnerHTML={{ __html: formattedClipHTML }} />
      <button className="flex-[1] h-5 border border-black rounded cursor-pointer" onClick={handleCopy}>
        Copy
      </button>
      <button
        className="flex-[1] h-5 border border-black rounded cursor-pointer"
        onClick={() => clip && reportError(clip, 'copy paste')}
      >
        copy/paste error
      </button>
      <button
        className="flex-[1] h-5 border border-black rounded cursor-pointer"
        onClick={() => clip && reportError(clip, 'clip generation')}
      >
        🚩
      </button>
    </div>
  );
}
