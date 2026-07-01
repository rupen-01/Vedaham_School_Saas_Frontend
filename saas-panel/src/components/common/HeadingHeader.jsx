import React from 'react'
import {Icon} from "@iconify/react"
import Breadcrumb from './BreadCrumb'
import BackButton from './BackButton'
import { useColorContext } from '../../context/context';


export default function HeadingHeader({icon,title="Defualt Hadding",items=[],back=false,Goback="",total,addOn=false}) {
const { color } = useColorContext();
const displayTotal = total === undefined || total === null ? 'Loading...' : total;
  return (
    <div className="py-4 mb-4 flex justify-between items-center lg:px-0 px-5">
      <div className="flex items-center">
        {/* <Icon className="mr-4 p-1 w-10 h-10 md:w-14 md:h-12 text-white rounded-sm"  style={{
            backgroundColor: color, // bg-[#00a76f]/40 in inline CSS
          }} icon={icon} />
      <div className='border-l-[3px] pl-2.5 border-gray-200/90 h-14'></div> */}
      <div className="flex flex-col items-start gap-y-[16px]">  
     <h1 className="capitalize font-semibold text-base sm:text-sm md:pt-3 md:text-sm">
      {title}
    </h1>

      <Breadcrumb
       items={items}
      />
        </div>
      </div>
      <div className='flex h-auto gap-4'>
      {total !== undefined && (
  <div className="h-12 md:h-14 px-3">
    <div className="bg-gray-200 rounded-lg h-full px-5 py-2 flex flex-row sm:flex-col items-center justify-center shadow-md">
      <span className="sm:text-[10px] text-[12.25px] font-bold mr-4 sm:mr-0 sm:font-semibold uppercase tracking-wider text-gray-600">
        Total
      </span>
      <p
        style={{ fontFamily: "Big Shoulders Stencil" }}
        className="sm:text-2xl font-extrabold text-gray-800"
      >
        {displayTotal}
      </p>
    </div>
  </div>
)}
      {
      addOn?addOn:null
      }
      {
        back && <BackButton back={Goback} />
      }
      </div>
      </div>
  )
}
