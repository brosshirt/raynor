'use client'

import React, { SetStateAction, useState, useRef, useEffect } from 'react'
import ThreeDots from '../Utility/ThreeDots'
import PenPaper from '../Utility/PenPaper'
import CopyButton from '../Utility/CopyButton'
import { db, ClipFolder } from '@/db'
import { clipListToHtml } from '@/lib/clipFormatter'
import { copyToClipboard } from '@/lib/genLib'
import Broom from '../Utility/Broom'
import UpArrow from '../Utility/UpArrow'
import DownArrow from '../Utility/DownArrow'

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
      document.addEventListener('mousedown', undoRenaming)
    }


    return () => {
      document.removeEventListener('mousedown', undoRenaming)
    }    
  }, [folderBeingRenamed])



  const createFolder = async () => {
    // this will allow us to create a new folder
    const id = await db.clipFolders.add({
      title: '',
      date: new Date(),
      clips: []
    })

    setFolderBeingRenamed(id)
    setNewFolderName('')
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

  const copyAllClips = () => {
    if (!folders){
      return
    }

    let html = ''

    for (const folder of folders){
      if (!folder.clips.length){
        continue
      }
      
      html += `<span style="color:red; font-weight:700">${folder.title}</span><br/>`
      html += clipListToHtml(folder.clips).__html
    }

    copyToClipboard(html)
  }

  const clearAllClips = async () => {
    if (!folders){
      return
    }
    
    for (const folder of folders){
      await clearClips(folder.id)
    }
  }

  const moveFolder = async (e: React.MouseEvent<HTMLButtonElement>, folder: ClipFolder, spaces: number) => {
    e.stopPropagation()
    
    if (!folders){
      return
    }

    const folderIndex = folders?.indexOf(folder)
    const folderToSwapIndex = folderIndex + spaces
    const folderToSwap = folders[folderToSwapIndex]

    if (!folderToSwap){
      return
    }

    // no temp object is needed because folder is a copy of what was in the db

    await db.clipFolders.update(folder.id, {
      title: folderToSwap.title,
      clips: folderToSwap.clips,
      date: folderToSwap.date
    })

    await db.clipFolders.update(folderToSwap.id, {
      title: folder.title,
      clips: folder.clips,
      date: folder.date
    })

    if (selectedFolderId === folder.id){
      console.log('youre moving the selected folder')
      setSelectedFolderId(folderToSwap.id)
    }

    if (selectedFolderId === folderToSwap.id){
      console.log('youre moving the selected folder')
      setSelectedFolderId(folder.id)
    }   
  }



  return (
    <ul className="p-2 bg-base-200 rounded-box w-60">
      <div className='flex flex-row-reverse'>
        <PenPaper onClick={createFolder}/>
        <CopyButton onCopy={copyAllClips} height='h-5' width='w-5' className=''/>
        <Broom onClick={clearAllClips} height='h-5' width='w-5' className=''/>
      </div>

      {folders?.map(folder => (
        <li
          className={`p-2 hover:cursor-pointer hover:bg-base-300 w-full h-9 ${folder.id === selectedFolderId ? 'bg-base-300': ''}`}
          onClick={() => setSelectedFolderId(folder.id)}
          key={folder.id}
          >
            <div className='flex justify-between items-center h-full w-full'>
              {folderBeingRenamed === folder.id ? (
                <input placeholder='Folder Name' autoFocus ref={folderNameInput} onKeyDown={handleInputKeyDown} type="text" value={newFolderName} onChange={(e) => setNewFolderName(e.currentTarget.value)} 
                  className='w-full'
                />
              ) : (
                <div className='w-3/4 overflow-hidden overflow-ellipsis whitespace-nowrap'>{folder.title}</div>
              )}
              <div className='flex flex-col items-center justify-evenly'>
                <UpArrow onClick={(e) => moveFolder(e, folder, -1)} height='h-2.5' width='w-2.5' className='p-0.5'/>
                <DownArrow onClick={(e) => moveFolder(e, folder, 1)} height='h-2.5' width='w-2.5' className='p-0.5'/>        
              </div>
              
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
