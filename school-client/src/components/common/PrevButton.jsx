import React from 'react'
import { Icon } from '@iconify/react'

export default function PrevButton({onClick,currentIndex}) {
  return (
    <button
      onClick={onClick}
      disabled={currentIndex === 0}
      className="px-4 py-2 font-semibold cursor-pointer bg-gray-200 flex gap-1 items-center text-sm rounded disabled:opacity-50"
    >
      <Icon icon="iconamoon:arrow-left-2-bold" className='text-xl' />  
      Prev
    </button>
  )
}
