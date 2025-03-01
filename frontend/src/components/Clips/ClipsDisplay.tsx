'use client';
import { Clip } from '@/db';
import ClipRow from './ClipRow';


interface ClipProps {
  clips: Clip[] | undefined;
  deleteClip: (articleLink: string) => void
}



export default function ClipsDisplay({ clips, deleteClip }: ClipProps) {
  

  return (
    <div className="overflow-x-auto">
      <table className="table">
        
        <thead>
          <tr className='text-base-content'>
            <th>Clip</th>
            <th>Report Error</th>
            <th>Delete Clip</th>
          </tr>
        </thead>
        <tbody>
          {clips?.slice().reverse().map((clip, index) => (
            <ClipRow 
              clip={clip}
              key={index}
              deleteClip={deleteClip}
              />
          ))}
        </tbody>
      </table>
    </div>
  );
}
