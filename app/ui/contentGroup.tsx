'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IRepoData } from '../github/types/IRepoData'
import ContentList from './contentList'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

interface IProps {
  title: string
  data: IRepoData[]
}

export default function ContentGroup(props: IProps) {
  const [collapse, setCollapse] = useState(true)

  const collapseHandler = () => {
    setCollapse(prev => !prev)
  }

  return (
    <li
      className="flex flex-col transition-all duration-300 items-center w-full border p-2 data-[collapse=true]:h-11 h-full"
      data-collapse={collapse}
    >
      <div className="flex justify-between items-center w-full pl-2">
        <p className="font-normal text-sm">{props.title}</p>
        <button className="w-7 h-7 border hover:border-blue-600 hover:text-blue-600" onClick={collapseHandler}>
          <FontAwesomeIcon
            className="data-[collapse=false]:rotate-180 transition-all"
            icon={faChevronDown}
            data-collapse={collapse}
          />
        </button>
      </div>
      <ul className="w-full gap-1 flex flex-col overflow-hidden">
        <div className="pt-2"></div>
        {props.data.map((data, i) => {
          return <ContentList key={i} data={data} />
        })}
      </ul>
    </li>
  )
}
