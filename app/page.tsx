'use client'

import axios from 'axios'
import useSWR from 'swr'
import { IRepoFetch } from './github/types/IRepoData'
import { useEffect, useState } from 'react'
import dataCollector, { IGroupedRepoData } from './utils/dataCollector'
import ContentGroup from './ui/contentGroup'

const fetcher = (args: string) => axios.get<IRepoFetch>(args).then(res => res.data)

export default function Home() {
  const { data: req } = useSWR('api/week2', fetcher)

  const [data, setData] = useState<IGroupedRepoData>({})

  useEffect(() => {
    if (!req) return
    setData(dataCollector(req.data))
  }, [req])

  return (
    <main className="w-vw flex justify-center">
      <ul className="w-full max-w-xl p-2 flex flex-col gap-2">
        {Object.keys(data).map((key, i) => {
          return <ContentGroup key={i} title={key} data={data[key]} />
        })}
      </ul>
    </main>
  )
}
