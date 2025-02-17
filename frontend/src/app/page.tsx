'use client'
import Clips from '@/components/Clips/Clips'
import {useState} from 'react'



export default function Home() {
  const [modal, setModal] = useState(false)

  return (
    <div className="grid place-items-center h-screen w-screen">
      <Clips/>
    </div>
  );
}
