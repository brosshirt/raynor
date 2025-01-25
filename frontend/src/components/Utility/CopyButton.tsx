import React, {useState} from 'react'


interface CopyButtonProps {
  onCopy: () => void
}

const CopyButton = ({onCopy}: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false)
  
  const handleCopy = () => {
    // code that changes the clipboard to show that checkmark and then calls a set timeout to change it back
    setHasCopied(true)
    onCopy()
    setTimeout(() => setHasCopied(false), 1000)
  }

  return (
    <button 
        className="btn btn-square btn-xs btn-ghost hover:bg-transparent absolute right-0 top-0"
        onClick={handleCopy}
        >
        <svg 
            className="h-4 w-4 " 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 32 32">
                <path 
                    d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z">
                </path>
                {hasCopied && (
                  <path d="M10 19 L14 23 L23 14 L21 12 L14 19 L12 17 Z" />                  
                )}
        </svg>
    </button>
  )

  // if (!hasCopied){

  // }
  // else{
  //   return (
  //     <button 
  //       className="btn btn-square btn-xs btn-ghost hover:bg-transparent absolute right-0 top-0"
  //       onClick={handleCopy}
  //       >
  //       <svg 
  //         className="h-4 w-4 fill—current" 
  //         xmlns="http://www.w3.org/2000/svg" 
  //         viewBox="0 0 32 32"> 
  //           <path 
  //             d="M 16 2 C 14.742188 2 13.847656 2.890625 13.40625 4 L 5 4 L 5 29 L 27 29 L 27 4 L 18.59375 4 C 18.152344 2.890625 17.257813 2 16 2 Z M 16 4 C 16.554688 4 17 4.445313 17 5 L 6 L 20 6 L 20 8 L 12 8 L 12 6 L 15 6 L 15 5 C 15 4.445313 15.445313 4 16 4 Z M 7 6 L 10 6 L 10 10 L 22 10 L 22 6 L 25 6 L 25 27 L 7 27 Z M 21.28125 13.28125 L 15 19.5625 L 11.71875 6.28125 L 10.28125 17.71875 L 14.28125 21.71875 L 15 22.40625 L 15.71875 21.71875 L 22.71875 14.71875 Z">
  //               </path> 
  //         </svg> 
  //     </button>
  //   )
  // }

}

export default CopyButton
