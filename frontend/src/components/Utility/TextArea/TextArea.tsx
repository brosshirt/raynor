
import React, { useEffect } from 'react'
import Tools from './Tools'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { HeadingNode } from '@lexical/rich-text'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { Clip } from '@/db'


interface TextAreaProps {
  clip: Clip
  editClip: (articleLink: string, updatedFields: Partial<Clip>) => void
}

const initialConfig = {
  namespace: 'basicConfig',
  theme: {},
  onError: (e:Error) => {
    throw e
  },
  // editorState: EMPTY_CONTENT,
  nodes: [HeadingNode, CodeHighlightNode, CodeNode]
}

const TextArea = ({ clip, editClip }: TextAreaProps) => {
  const updateClip = (notesHtml: string) => {

    editClip(clip.article_link, { notesHtml })
  }


  return (
    <LexicalComposer initialConfig={initialConfig} >
      <div className='grid place-items-center'>
        <RichTextPlugin 
          
          contentEditable={<ContentEditable className='max-w-lg min-w-36 h-24 px-2 text-xs overflow-scroll outline-none border border-black rounded-md'/>}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
          />
      </div>
      <Tools onTextChange={updateClip} notesHtml={clip.notesHtml}/>
    </LexicalComposer>
  )
}

export default TextArea
