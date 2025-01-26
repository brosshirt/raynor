'use client';
import React, { useState, useEffect } from 'react';
import { articleInfoToHtml } from '@/lib/clipFormatter';
import { ArticleInfo } from '@/lib/types';
import ClipRow from './ClipRow';


interface ClipProps {
  clip: ArticleInfo | undefined;
  reportError: (errorType: string) => void;
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
          <ClipRow formattedClipHtml={formattedClipHtml} onCopy={handleCopy} reportError={reportError}/>
        </tbody>
      </table>
    </div>
  );
}
