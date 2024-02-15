'use client'

import axios from 'axios'
import useSWR from 'swr'
import { IRepoFetch } from './github/types/IRepoData'
import { useEffect, useState } from 'react'
import dataCollector, { IGroupedRepoData } from './utils/dataCollector'
import ContentGroup from './ui/contentGroup'
import Select from 'react-select'
import weekOptionGenerator from './utils/weekOptionGenerator'

const fetcher = (args: string) => axios.get<IRepoFetch>(args).then(res => res.data)

export default function Home() {
  const [data, setData] = useState<IGroupedRepoData>({})
  const [week, setWeek] = useState<string>('week2')

  const { data: weekList } = useSWR('api/week', fetcher)
  const { data: req } = useSWR(`api/${week}`, fetcher)

  useEffect(() => {
    if (!req) return
    setData(dataCollector(req.data))
  }, [req])

  return (
    <main className="w-vw flex items-center flex-col">
      <div className="w-full max-w-xl flex border p-2 rounded-sm mt-28 mb-2">
        <Select
          className="w-full"
          defaultValue={{ label: 'week2', value: 'week2' }}
          onChange={week => setWeek(week?.value ?? 'week2')}
          options={weekList ? weekOptionGenerator(weekList.data) : []}
        />
      </div>
      <ul className="w-full max-w-xl flex flex-col gap-2 mb-28">
        {Object.keys(data).map((key, i) => {
          return <ContentGroup key={i} title={key} data={data[key]} />
        })}
      </ul>
    </main>
  )
}
