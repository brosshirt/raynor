import { Clip } from '@/db'
import React, { useState, useRef, useEffect } from 'react'

interface ClipDisplayProps {
    clip: Clip
    editClip: (newClip: Clip) => void
}


const ClipDisplay = ({ clip, editClip }: ClipDisplayProps) => {
    const [selectedField, setSelectedField] = useState<string | null>(null)
    const [title, setTitle] = useState(clip.title)
    const [publication, setPublication] = useState(clip.publication)
    const [date, setDate] = useState(clip.publication_date)
    const [authors, setAuthors] = useState(clip.authors.join(', '))

    const linkSingleClick = useRef(false)

    const divElement = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
      console.log('title has changed')
    }, [title])



    useEffect(() => {
      // we're trying to support the ability to click off and have your results save, I think for simplicities sake I'll just do the entire div
      
      
      setTimeout(() => {
        console.log('clip title', clip.title)
        console.log('state title', title)

      },1000)
      
      
      const saveChanges = async (e: MouseEvent) => {
        if (!divElement.current?.contains(e.target as Node)){
          updateClip()
        }
      }

      if (selectedField){
        document.addEventListener('mousedown', saveChanges)
      }

      return () => document.removeEventListener('mousedown', saveChanges)

    }, [selectedField, title, publication, date, authors])
    
    const updateClip = () => {
      const newClip = {
        title: title,
        publication_date: date,
        publication: publication,
        authors: authors.split(', '),
        article_link: clip.article_link
      }

      editClip(newClip)

      setSelectedField(null)
    }
    


    const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      
      if (!linkSingleClick.current){ // if linkSingleClick is true then this is a double click, which is ignored and handled by the double click handler
        
        linkSingleClick.current = true
        
        setTimeout(() => {
          if (linkSingleClick.current){ // double click handler never fired to reset this, single click
            
            // open tab, a tag default behavior
            const target = e.target as HTMLAnchorElement
            window.open(target.href, '_blank')?.focus()
  
            linkSingleClick.current = false // reset everything
          }
        }, 300)
      
      }
    }
  
  
    
  
    const doubleClickLinkHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
      linkSingleClick.current = false
  
      setSelectedField('title')
    }
  



    return (
        <div ref={divElement}>
            <b>
                {selectedField === 'title' ? <input autoFocus type="text" value={title} onChange={e => setTitle(e.target.value)} className='w-full border rounded-md border-base-300' onKeyDown={e => e.key === 'Enter' && updateClip()}/> : <a onClick={linkClickHandler} onDoubleClick={doubleClickLinkHandler} target="_blank" href={clip.article_link}>{clip.title}</a>}
                {' - '}  
                {selectedField === 'publication' ? <input autoFocus type='text' value={publication} onChange={e => setPublication(e.target.value)} className='w-full border rounded-md border-base-300' onKeyDown={e => e.key === 'Enter' && updateClip()}/> : <span onDoubleClick={() => setSelectedField('publication')}>{clip.publication}</span> }
                {' - '}
                {selectedField === 'date' ? <input autoFocus type='text' value={date} onChange={e => setDate(e.target.value)} className='w-full border rounded-md border-base-300' onKeyDown={e => e.key === 'Enter' && updateClip()}/> : <span onDoubleClick={() => setSelectedField('date')}>{clip.publication_date}</span> }
            </b>
            <br />
            <i>
                {' By '} 
                {selectedField === 'authors' ? <input autoFocus type='text' value={authors} onChange={e => setAuthors(e.target.value)} className='w-full border rounded-md border-base-300' onKeyDown={e => e.key === 'Enter' && updateClip()}/> : <span onDoubleClick={() => setSelectedField('authors')}>{clip.authors.join(', ')}</span> }
            </i>
        </div>
  )
}

export default ClipDisplay
