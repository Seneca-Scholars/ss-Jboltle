'use client'

import { useState, useEffect } from 'react'

export default function LoadingButton() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <button
      className="bg-black text-white px-4 py-2 rounded-md font-semibold relative overflow-hidden"
      disabled
    >
      <span className="mr-2">Loading</span>
      <span className="inline-block w-6 text-left">{dots}</span>
    </button>
  )
}