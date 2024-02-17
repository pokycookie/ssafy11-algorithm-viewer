'use client'

import axios from 'axios'
import useSWR from 'swr'
import { IRepoFetch } from './github/types/IRepoData'
import { useEffect, useState } from 'react'
import { groupByProblem, groupByUser, IGroupedRepoData } from './utils/dataCollector'
import ContentGroup from './ui/contentGroup'
import Select from 'react-select'
import { searchOptionGenerator, weekOptionGenerator } from './utils/optionGenerator'

const fetcher = (args: string) => axios.get<IRepoFetch>(args).then(res => res.data)

export default function Home() {
  const [data, setData] = useState<IGroupedRepoData>({})
  const [week, setWeek] = useState<string>('week2')
  const [grouping, setGrouping] = useState<TGrouping>('problem')
  const [search, setSearch] = useState<string[]>([])

  const { data: weekList } = useSWR('api/week', fetcher)
  const { data: req } = useSWR(`api/${week}`, fetcher)

  useEffect(() => {
    if (!req) return
    switch (grouping) {
      case 'problem':
        setData(groupByProblem(req.data))
        break
      case 'user':
        setData(groupByUser(req.data))
        break
    }
  }, [req, grouping])

  return (
    <main className="w-vw flex items-center flex-col">
      <div className="w-full max-w-xl flex gap-2 mt-28 mb-8">
        <Select
          className="w-32"
          defaultValue={{ label: 'week2', value: 'week2' }}
          onChange={week => setWeek(week?.value ?? 'week2')}
          options={weekList ? weekOptionGenerator(weekList.data) : []}
        />
        <Select
          className="w-32"
          options={groupingOption}
          defaultValue={groupingOption[0]}
          onChange={group => setGrouping(group?.value ?? 'problem')}
        />
        <Select
          className="flex-1"
          placeholder="Search"
          options={searchOptionGenerator(data)}
          onChange={e => setSearch(e.map(it => it.value))}
          isClearable
          isMulti
        />
      </div>
      <ul className="w-full max-w-xl flex flex-col gap-2 mb-28">
        {Object.keys(data)
          .sort()
          .filter(e => (search.length > 0 ? search.some(it => it == e) : true))
          .map((key, i) => {
            return <ContentGroup key={i} title={key} data={data[key]} />
          })}
      </ul>
    </main>
  )
}

type TGrouping = 'problem' | 'user'

const groupingOption: { label: string; value: TGrouping }[] = [
  { label: '문제별', value: 'problem' },
  { label: '유저별', value: 'user' },
]
