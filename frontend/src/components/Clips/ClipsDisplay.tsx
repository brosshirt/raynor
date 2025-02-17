'use client';
import React, { useState, useEffect } from 'react';
import { articleInfoToHtml } from '@/lib/clipFormatter';
import { Clip } from '@/db';
import ClipRow from './ClipRow';
import { db } from '@/db';


interface ClipProps {
  clips: Clip[] | undefined;
  deleteClip: (articleLink: string) => void
}

export default function ClipsDisplay({ clips, deleteClip }: ClipProps) {
  
  return (
    <div className="overflow-x-auto">
      <table className="table">
        
        <thead>
          <tr>
            <th>Clip</th>
            <th>Copy Error</th>
            <th>Generate Error</th>
            <th>Delete Clip</th>
          </tr>
        </thead>
        <tbody>
          {clips?.map(clip => (
            <ClipRow 
              clip={clip}
              key={clip.title}
              deleteClip={deleteClip}
              />
          ))}
        </tbody>
      </table>
    </div>
  );
}
