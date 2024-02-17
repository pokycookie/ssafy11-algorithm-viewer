'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IRepoData } from '../github/types/IRepoData'
import ContentList from './contentList'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { MouseEvent, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface IProps {
  title: string
  data: IRepoData[]
}

export default function ContentGroup(props: IProps) {
  const [collapse, setCollapse] = useState(true)
  const titleREF = useRef<HTMLDivElement>(null)

  const collapseHandler = () => {
    setCollapse(prev => !prev)
  }

  const easyCollapseHandler = (e: MouseEvent) => {
    if (e.target == titleREF.current) {
      setCollapse(prev => !prev)
    }
  }

  return (
    <motion.li className="flex flex-col hover:border-blue-600 transition-all items-center w-full border p-2">
      <div
        className="flex justify-between items-center w-full pl-2"
        ref={titleREF}
        onClick={e => easyCollapseHandler(e)}
      >
        <p className="font-normal text-sm">{props.title}</p>
        <button className="w-7 h-7 border hover:border-blue-600 hover:text-blue-600" onClick={collapseHandler}>
          <FontAwesomeIcon
            className="data-[collapse=false]:rotate-180 transition-all"
            icon={faChevronDown}
            data-collapse={collapse}
          />
        </button>
      </div>
      <motion.ul className="w-full gap-1 flex flex-col overflow-hidden" animate={{ height: collapse ? '0px' : '100%' }}>
        <div className="pt-2"></div>
        {props.data.map((data, i) => {
          return <ContentList key={i} data={data} />
        })}
      </motion.ul>
    </motion.li>
  )
}
