import { useEffect, useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $generateHtmlFromNodes } from '@lexical/html'
import { $generateNodesFromDOM } from '@lexical/html'
import { $createParagraphNode, $getRoot } from 'lexical'

interface ToolsProps {
  onTextChange: (text: string) => void,
  notesHtml: string
}

const Tools = ({ onTextChange, notesHtml }: ToolsProps) => {
  const [editor] = useLexicalComposerContext()

  // in dev mode we will render the starter text twice unless we do this check
  const isMountedRef = useRef<boolean>(false)


  useEffect(() => {
    editor.update(() => {

      if (isMountedRef.current || !notesHtml) return

      const parser = new DOMParser()
      const dom = parser.parseFromString(notesHtml, 'text/html')

      const nodes = $generateNodesFromDOM(editor, dom)

      const paragraphNode = $createParagraphNode()
      nodes.forEach(node => paragraphNode.append(node))
      
      $getRoot().append(paragraphNode)

      isMountedRef.current = true
    })
  }, [editor, notesHtml])

  const saveNotes = () => {
    editor.read(() => {
      const html = $generateHtmlFromNodes(editor, null).replace('<p><br></p><p>', '').replace('</p>','')
      onTextChange(html)
    })
  }

  return <button className='btn btn-ghost btn-xs' onClick={() => saveNotes()}>save</button>
}

export default Tools
