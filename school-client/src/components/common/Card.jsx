import React from 'react'

const Card =({children,className=""}) =>{
  return (
    <div className={`bg-[#fff] border border-gray-100 rounded-lg p-5 min-h-sm mx-auto shadow-sm w-full ${className}`}>
        {children}
    </div>
  )
}
export default Card;