'use client';
import React, { useState } from 'react';
import ClipSearchBar from './ClipSearchBar';
import { getClip } from '@/lib/clipFormatter';
import ClipsDisplay from './ClipsDisplay';
import {db} from '@/db'
import { useLiveQuery } from 'dexie-react-hooks';

interface ClipsMainContent {
  selectedFolderId: number
}


export default function ClipsMainContent({ selectedFolderId }: ClipsMainContent) {
  const [link, setLink] = useState('');
  const [error, setError] = useState('')

  const clips = useLiveQuery(async () => {
    
    const folder = await db.clipFolders.get(selectedFolderId)
    const clips = folder?.clips

    return clips
  },[selectedFolderId])

  const generateClip = async () => {
    try {
      const newClip = await getClip(link);

      await db.clipFolders.update(selectedFolderId, {
        clips: clips ? [...clips, newClip] : [newClip]
      })

      setLink('');
      setError('')
    } catch(error){
      if (error instanceof Error){
        console.error('error on getClip', error)
        setError(error.message)
      }
    }
  };

  const deleteClip = async (articleLink: string) => {
    await db.clipFolders.update(selectedFolderId, {
      clips: clips ? clips.filter(clip => clip.article_link !== articleLink): []
    })
  }



  return (
    <div className='space-y-4'>
        <ClipSearchBar link={link} setLink={setLink} generateClip={generateClip} clips={clips} />
        {error && (
          <div className='text-error'>
            {error}
          </div>
        )}
        <ClipsDisplay clips={clips} deleteClip={deleteClip} />
    </div>
  )

}
