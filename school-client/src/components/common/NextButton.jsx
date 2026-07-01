import React from 'react';
import { Icon } from '@iconify/react';
import { useColorContext } from '../../context/context';


export default function NextButton({onClick,currentIndex,steps}) {
  const { color, bgColor } = useColorContext();
  return (
    <button
    style={{
        backgroundColor: color,
    }}
    onClick={onClick}
    disabled={currentIndex === steps.length - 1}
    className="flex cursor-pointer gap-1 items-center font-semibold text-sm px-4 py-2 text-white rounded disabled:opacity-50"
  >
    Next
    <Icon icon="iconamoon:arrow-left-2-bold" className='text-xl rotate-180' />  
  </button>
  )
}
