
'use client'

import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import ClipsMainContent from './ClipsMainContent'
import {db, ClipFolder} from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'


const Clips = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<number>(1)
  
  const folders = useLiveQuery(async () => {
    return db.clipFolders.toArray()
  })

  useEffect(() => {
    const initClips = async () => {
      const clipFolders = await db.clipFolders.toArray()
      if (clipFolders.length === 0){
        const id = await db.clipFolders.put({
          title: "New Folder",
          date: new Date(),
          clips: []
        })
        setSelectedFolderId(id)
      }
      else {
        setSelectedFolderId(clipFolders[0].id)
      }
    }
    initClips()
  }, [])

  
  

  return (
    <div className='w-screen flex h-[100%] gap-8' >
      <Sidebar selectedFolderId={selectedFolderId} setSelectedFolderId={setSelectedFolderId} folders={folders}/>
      <ClipsMainContent selectedFolderId={selectedFolderId}/>
    </div>
  )
}
 
export default Clips
