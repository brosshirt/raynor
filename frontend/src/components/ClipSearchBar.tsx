'use client';
import React from 'react';

interface ClipSearchBarProps {
  link: string;
  setLink: (value: string) => void;
  generateClip: () => void;
}

export default function ClipSearchBar({ link, setLink, generateClip }: ClipSearchBarProps) {
  return (
    <div className="w-4/5 h-1/5 flex items-center justify-center gap-2">
      <input
        type="text"
        placeholder="Paste Article Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="flex-[3] border border-black rounded p-0 leading-none h-1/2"
      />
      <button
        onClick={generateClip}
        className="flex-[1] border border-black rounded-lg h-1/2 cursor-pointer p-0 leading-none"
      >
        Send
      </button>
    </div>
  );
}
