'use client';
import React, { useState } from 'react';
import ClipSearchBar from './ClipSearchBar';
import { getClip } from '@/lib/clipFormatter';
import ClipsDisplay from './ClipsDisplay';
import {Clip, db} from '@/db'
import { useLiveQuery } from 'dexie-react-hooks';

interface ClipsMainContent {
  selectedFolderId: number
}


export default function ClipsMainContent({ selectedFolderId }: ClipsMainContent) {
  const [link, setLink] = useState('');
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const clips = useLiveQuery(async () => {
    
    const folder = await db.clipFolders.get(selectedFolderId)
    const clips = folder?.clips

    return clips
  },[selectedFolderId])

  const generateClip = async () => {
    try {
      setIsLoading(true)
      const newClip = await getClip(link);

      await db.clipFolders.update(selectedFolderId, {
        clips: clips ? [newClip, ...clips] : [newClip]
      })

      setLink('');
      setError('')
      setIsLoading(false)
    } catch(error){
      if (error instanceof Error){
        console.error('error on getClip', error)
        setError(error.message)
        setIsLoading(false)
      }
    }
  };

  const deleteClip = async (articleLink: string) => {
    await db.clipFolders.update(selectedFolderId, {
      clips: clips ? clips.filter(clip => clip.article_link !== articleLink): []
    })
  }

  const editClip = async (newClip: Clip) => {
    const mapFunc = (clip: Clip) => {
      if (clip.article_link === newClip.article_link){
        return newClip
      }
      return clip
    }
    
    await db.clipFolders.update(selectedFolderId, {
      clips: clips ? clips.map(mapFunc) : []
    })
  }

  const swapClips = async (i: number, j: number) => {
    // swaps the clips at 2 indices
    if (!clips || !clips[i] || !clips[j]){
      return
    }

    const clipsCopy = clips.slice()

    const temp = clipsCopy[i]
    clipsCopy[i] = clipsCopy[j]
    clipsCopy[j] = temp

    await db.clipFolders.update(selectedFolderId, {
      clips: clipsCopy
    })
  }



  return (
    <div className='space-y-4'>
        <ClipSearchBar link={link} setLink={setLink} generateClip={generateClip} clips={clips} isLoading={isLoading} />
        {error && (
          <div className='text-error'>
            {error}
          </div>
        )}
        <ClipsDisplay clips={clips} deleteClip={deleteClip} swapClips={swapClips} editClip={editClip}/>
    </div>
  )

}
