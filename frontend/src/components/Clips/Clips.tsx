
'use client'

import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import ClipsMainContent from './ClipsMainContent'
import {db, ClipFolder} from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'


const Clips = () => {
  const folders = useLiveQuery(async () => {
    const output = await db.clipFolders.toArray()
    console.log(output)
    return db.clipFolders.toArray()
  })

  const [selectedFolderId, setSelectedFolderId] = useState<number>(1)
  

  return (
    <div className='w-screen flex h-[100%] gap-8'>
      <Sidebar selectedFolderId={selectedFolderId} setSelectedFolderId={setSelectedFolderId} folders={folders}/>
      <ClipsMainContent selectedFolderId={selectedFolderId}/>
    </div>
  )
}
 
export default Clips
