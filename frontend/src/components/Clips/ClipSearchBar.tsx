'use client';
import React from 'react';

interface ClipSearchBarProps {
  link: string;
  setLink: (value: string) => void;
  generateClip: () => void;
}

export default function ClipSearchBar({ link, setLink, generateClip }: ClipSearchBarProps) {
  return (
    <div className="flex gap-2 pt-10">
      <div className="form-control">
        <input type="text" placeholder="Paste URL" className="input input-bordered w-72 h-8" value={link} onChange={e => setLink(e.target.value)}/>
      </div>
      <button
        onClick={generateClip}
        className="btn btn-sm"
      >
        Get Clip
      </button>
    </div>
  );
}
