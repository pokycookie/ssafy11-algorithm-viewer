'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContentList from './contentList'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IGroupedSolution } from '../utils/dataCollector'

interface IProps {
  data: IGroupedSolution
}

export default function ContentGroup({ data }: IProps) {
  const [collapse, setCollapse] = useState(true)

  const collapseHandler = () => {
    setCollapse(prev => !prev)
  }

  useEffect(() => {
    setCollapse(true)
  }, [data])

  return (
    <motion.li className="flex flex-col hover:border-blue-600 transition-all items-center w-full border p-2">
      <div className="flex overflow-hidden gap-3 justify-between items-center w-full pl-2">
        <div className="flex-1 flex gap-2 font-normal items-center text-sm" onClick={collapseHandler}>
          {data.grouping === 'problem' ? (
            <>
              <Image
                className="w-3"
                src={`/img/icon/${data.level}.svg`}
                alt={data.level ?? ''}
                width={15}
                height={15}
              />
              <p className="w-11 overflow-hidden text-ellipsis whitespace-nowrap">{data.id}</p>
              <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{data.title}</p>
              <p className="text-xs bg-zinc-200 p-1 rounded-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {data.class}
              </p>
            </>
          ) : (
            <>
              <p className="w-8 overflow-hidden text-ellipsis whitespace-nowrap">{data.team}</p>
              <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{data.name}</p>
            </>
          )}
        </div>
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
        {data.solutions.map((data, i) => {
          return <ContentList key={i} data={data} />
        })}
      </motion.ul>
    </motion.li>
  )
}
