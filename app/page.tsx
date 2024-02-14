'use client'

import axios from 'axios'
import useSWR from 'swr'
import { IRepoFetch } from './api/types/github/IRepoData'
import ContentList from './api/ui/contentList'
import { useEffect, useState } from 'react'
import dataCollector, { IGroupedRepoData } from './api/utils/dataCollector'

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
      <ul className="w-full max-w-xl">
        {Object.keys(data).map((key, i) => {
          return (
            <ul key={i} className="p-1 border flex flex-col items-center m-2">
              <h3 className="text-sm font-medium">{key}</h3>
              {data[key].map((data, i) => {
                return <ContentList key={i} data={data} />
              })}
            </ul>
          )
        })}
      </ul>
    </main>
  )
}
