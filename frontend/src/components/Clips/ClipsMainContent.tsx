'use client';
import React, { useState } from 'react';
import ClipSearchBar from './ClipSearchBar';
import { getClip } from '@/lib/clipFormatter';
import { ArticleInfo } from '@/lib/types';
import ClipsDisplay from './ClipsDisplay';

export default function ClipsMainContent() {
  const [link, setLink] = useState('');
  const [clip, setClip] = useState<ArticleInfo | undefined>();
  const [error, setError] = useState('')

  const generateClip = async () => {
    try {
      const newClip = await getClip(link);
      setClip(newClip);
      setLink('');
      setError('')
    } catch(error){
      if (error instanceof Error){
        console.error('error on getClip', error)
        setError(error.message)
      }
    }
  };

  const handleReportError = async (errorType: string) => {
    console.log('reporting error')

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
  };

  return (
    <div className='space-y-4'>
        <ClipSearchBar link={link} setLink={setLink} generateClip={generateClip} />
        {error && (
          <div className='text-error'>
            {error}
          </div>
        )}
        <ClipsDisplay clip={clip} reportError={handleReportError}/>
    </div>
  )

}
