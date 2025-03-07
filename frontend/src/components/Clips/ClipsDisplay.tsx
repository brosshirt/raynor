'use client';
import { Clip } from '@/db';
import ClipRow from './ClipRow';


interface ClipProps {
  clips: Clip[] | undefined;
  deleteClip: (articleLink: string) => void
  swapClips: (i: number, j: number) => void
}





export default function ClipsDisplay({ clips, deleteClip, swapClips }: ClipProps) {
  

  return (
    <div className="overflow-x-auto">
      <table className="table">
        
        <thead>
          <tr className='text-base-content'>
            <th>Clip</th>
            <th>Report Error</th>
            <th>Delete Clip</th>
            <th>Change Order</th>
          </tr>
        </thead>
        <tbody>
          {clips?.map((clip, index) => (
            <ClipRow 
              clip={clip}
              key={index}
              index={index}
              deleteClip={deleteClip}
              swapClips={swapClips}
              />
          ))}
        </tbody>
      </table>
    </div>
  );
}
