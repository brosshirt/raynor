'use client'

import React, { SetStateAction, useState, useRef, useEffect } from 'react'
import ThreeDots from '../Utility/ThreeDots'
import PenPaper from '../Utility/PenPaper'
import MagnifyingGlass from '../Utility/MagnifyingGlass'
import { db, ClipFolder } from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'

interface SidebarProps {
  folders: ClipFolder[] | undefined
  selectedFolderId: number
  setSelectedFolderId: React.Dispatch<SetStateAction<number>>
}

const Sidebar = ({ folders, selectedFolderId, setSelectedFolderId}: SidebarProps) => {
  const [folderBeingRenamed, setFolderBeingRenamed] = useState<number | undefined>()
  const [newFolderName, setNewFolderName] = useState('') 

  const folderNameInput = useRef<HTMLInputElement>(null)
  

  useEffect(() => {
    const undoRenaming = (e: MouseEvent) => {
      if (!folderNameInput.current?.contains(e.target as Node)){
        console.log('undoing rename')
        setFolderBeingRenamed(undefined)
      }
    }

    if (folderBeingRenamed){
      document.addEventListener('click', undoRenaming)
    }


    return () => {
      document.removeEventListener('click', undoRenaming)
    }    
  }, [folderBeingRenamed])



  const createFolder = async () => {
    // this will allow us to create a new folder
    const id = await db.clipFolders.add({
      title: 'New Folder',
      date: new Date(),
      clips: []
    })

    setFolderBeingRenamed(id)
    setNewFolderName('New Folder')
  }

  const deleteFolder = async (folderId: number) => {
    await db.clipFolders.delete(folderId)
  }

  const startRename = (folderId: number | undefined, folderTitle: string) => {
    setFolderBeingRenamed(folderId)
    setNewFolderName(folderTitle)
  }

  const clearClips = async (folderId: number) => {
    await db.clipFolders.update(folderId, {
      clips: []
    })
  }


  const handleInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter'){
      if (folderBeingRenamed){
        await db.clipFolders.update(folderBeingRenamed, {
          title: newFolderName
        })
      }
      setNewFolderName('')
      setFolderBeingRenamed(undefined)
    }
  }



  return (


    <ul className="p-2 bg-base-200 rounded-box w-56">
      <div className='flex flex-row-reverse'>
        <PenPaper onClick={createFolder}/>
      </div>

      {folders?.map(folder => (
        <li
          className={`p-2 hover:cursor-pointer hover:bg-base-300 w-full h-9 ${folder.id === selectedFolderId ? 'bg-gray-300': ''}`}
          onClick={() => setSelectedFolderId(folder.id)}
          key={folder.id}
          >
            <div className='flex justify-between items-center h-full w-full'>
              {folderBeingRenamed === folder.id ? (
                <input autoFocus ref={folderNameInput} onKeyDown={handleInputKeyDown} type="text" value={newFolderName} onChange={(e) => setNewFolderName(e.currentTarget.value)} 
                  className='w-full'
                />
              ) : (
                <div>{folder.title}</div>
              )}
              <ThreeDots 
                onRename={() => startRename(folder.id, folder.title)} 
                onDelete={() => deleteFolder(folder.id)}
                onClear={() => clearClips(folder.id)}
                />
            </div>
   
        </li>
      ))}


    </ul>
  )
}

export default Sidebar
