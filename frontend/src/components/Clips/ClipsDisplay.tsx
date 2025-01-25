'use client';
import React, { useState, useEffect } from 'react';
import { articleInfoToHtml } from '@/lib/clipFormatter';
import { ArticleInfo } from '@/lib/types';
import ClipRow from './ClipRow';


interface ClipProps {
  clip: ArticleInfo | undefined;
  reportError: (clip: ArticleInfo, errorType: string) => void;
}

export default function ClipsDisplay({ clip, reportError }: ClipProps) {
  const [formattedClipHtml, setFormattedClipHtml] = useState<{ __html: string }>({__html: ''});

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

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Clip</th>
            <th>Copy Error</th>
            <th>Generation Error</th>
          </tr>
        </thead>
        <tbody>
          <ClipRow formattedClipHtml={formattedClipHtml}/>
        </tbody>
      </table>
    </div>
    // <div className="border border-black rounded w-full h-1/2 flex items-center gap-2 p-2">
    //   <span className="flex-[10]" dangerouslySetInnerHTML={{ __html: formattedClipHTML }} />
    //   <button className="flex-[1] h-5 border border-black rounded cursor-pointer" onClick={handleCopy}>
    //     Copy
    //   </button>
    //   <button
    //     className="flex-[1] h-5 border border-black rounded cursor-pointer"
    //     onClick={() => clip && reportError(clip, 'copy paste')}
    //   >
    //     copy/paste error
    //   </button>
    //   <button
    //     className="flex-[1] h-5 border border-black rounded cursor-pointer"
    //     onClick={() => clip && reportError(clip, 'clip generation')}
    //   >
    //     🚩
    //   </button>
    // </div>
  );
}
