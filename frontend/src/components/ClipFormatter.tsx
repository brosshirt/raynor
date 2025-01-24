'use client';
import React, { useState } from 'react';
import ClipSearchBar from './ClipSearchBar';
import Clip from './Clip';
import { getClip } from '@/lib/clipFormatter';
import { ArticleInfo } from '@/lib/types';

export default function ClipFormatter() {
  const [link, setLink] = useState('');
  const [clip, setClip] = useState<ArticleInfo | undefined>();

  const generateClip = async () => {
    const newClip = await getClip(link);
    setClip(newClip);
    setLink('');
  };

  const handleReportError = async (clipData: ArticleInfo, errorType: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/error`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error_type: errorType,
        publication: clipData.publication,
        article_link: clipData.article_link,
        error_message: '',
      }),
    });
    const data = await res.json();
    console.log('backendResponse', data);
  };

  // "h-[80%] w-1/2 flex flex-col items-center justify-center"

  return (
    <div className="h-[80%] w-1/2 flex flex-col items-center justify-center">
      <ClipSearchBar link={link} setLink={setLink} generateClip={generateClip} />
      <Clip clip={clip} reportError={handleReportError} />
    </div>
  );
}
