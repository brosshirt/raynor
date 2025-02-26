'use client'
import Clips from '@/components/Clips/Clips'
import {useEffect} from 'react'
import { db } from '@/db'


export default function Home() {



  return (
    <div className="grid place-items-center h-screen w-screen">
      <Clips/>
    </div>
  );
}
