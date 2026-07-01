import React from 'react'
import { Icon } from "@iconify/react"
import Breadcrumb from './BreadCrumb'
import BackButton from './BackButton'
import { useColorContext } from '../../context/context';

export default function HeadingHeader({
  icon,
  title = "Default Heading",
  items = [],
  back = false,
  Goback = "",
  total,
  addOn = false
}) {
  const { color } = useColorContext();
  const displayTotal = total === undefined || total === null ? 'Loading...' : total;

  return (
    <div className="py-2 mb-3 flex justify-between items-center lg:px-0 px-4">
      <div className="flex items-center">
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="capitalize font-semibold text-sm sm:text-base">
            {title}
          </h1>
          <Breadcrumb items={items} />
        </div>
      </div>

      <div className="flex h-auto gap-3">
        {total !== undefined && (
          <div className="h-10 md:h-12">
            <div className="bg-gray-200 rounded-lg h-full px-3 py-1 flex flex-row sm:flex-col items-center justify-center shadow-sm">
              <span className="sm:text-[10px] text-[11px] font-semibold uppercase tracking-wide text-gray-600 mr-2 sm:mr-0">
                Total
              </span>
              <p
                style={{ fontFamily: "Big Shoulders Stencil" }}
                className="sm:text-xl font-bold text-gray-800"
              >
                {displayTotal}
              </p>
            </div>
          </div>
        )}
        {addOn ? addOn : null}
        {back && <BackButton back={Goback} />}
      </div>
    </div>
  )
}
