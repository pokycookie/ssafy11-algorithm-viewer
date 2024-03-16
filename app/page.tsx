'use client'

import axios from 'axios'
import useSWR from 'swr'
import { IGithubFetch } from './types/IGithubData'
import { useEffect, useState } from 'react'
import { groupByProblem, groupByUser, IGroupedSolution, metaDataCollector, TGrouping } from './utils/dataCollector'
import ContentGroup from './ui/contentGroup'
import Select from 'react-select'
import { searchOptionGenerator, weekOptionGenerator } from './utils/optionGenerator'
import { IGroupedBojData } from './types/IMetaData'

const fetcher = (args: string) => axios.get<IGithubFetch>(args).then(res => res.data)

export default function Home() {
  const [data, setData] = useState<IGroupedSolution[]>([])
  const [meta, setMeta] = useState<IGroupedBojData>({})
  const [week, setWeek] = useState<string>('week1')
  const [grouping, setGrouping] = useState<TGrouping>('problem')
  const [search, setSearch] = useState<string[]>([])

  const { data: weekList } = useSWR('api/week', fetcher)
  const { data: req } = useSWR(`api/${week}`, fetcher)
  const { data: metaReq } = useSWR('api/meta', fetcher)

  useEffect(() => {
    ;(async () => {
      if (!metaReq) return
      setMeta(await metaDataCollector(metaReq.data))
    })()
  }, [metaReq])

  useEffect(() => {
    ;(async () => {
      if (!req || !meta[week]) return
      switch (grouping) {
        case 'problem':
          setData(await groupByProblem(req.data, meta[week]))
          break
        case 'user':
          setData(groupByUser(req.data, meta[week]))
          break
      }
    })()
  }, [req, meta, grouping, week])

  return (
    <main className="w-vw flex items-center flex-col p-4">
      <div className="w-full max-w-2xl flex gap-2 mt-28 mb-8">
        <Select
          className="w-32"
          defaultValue={{ label: 'week1', value: 'week1' }}
          onChange={week => setWeek(week?.value ?? 'week1')}
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
      <ul className="w-full max-w-2xl flex flex-col gap-2 mb-28">
        {data
          .filter(e => {
            if (search.length === 0) return true
            if (grouping === 'problem') return search.some(it => it == e.id)
            if (grouping === 'user') return search.some(it => it == `${e.team} ${e.name}`)
            return true
          })
          .map((e, i) => {
            return <ContentGroup key={i} data={e} />
          })}
      </ul>
    </main>
  )
}

const groupingOption: { label: string; value: TGrouping }[] = [
  { label: '문제별', value: 'problem' },
  { label: '유저별', value: 'user' },
]
