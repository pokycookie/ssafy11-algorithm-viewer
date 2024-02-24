import axios from 'axios'
import { IGithubData } from '../types/IGithubData'
import { IBojData, IGroupedBojData, IMetaData } from '../types/IMetaData'
import { titleSeparator } from './titleSeparator'
import { ISolution } from '../types/ISolution'

export interface IGroupedRepoData {
  [key: string]: IGithubData[]
}

export function groupByUser(data: IGithubData[]): IGroupedRepoData {
  const map: IGroupedRepoData = {}

  data.forEach(e => {
    const title = titleSeparator(e.name)
    if (!map.hasOwnProperty(`${title.team} ${title.name}`)) {
      map[`${title.team} ${title.name}`] = []
    }
    map[`${title.team} ${title.name}`].push(e)
  })

  return map
}

export async function metaDataCollector(data: IGithubData[]): Promise<IGroupedBojData> {
  const map: IGroupedBojData = {}

  for (const e of data) {
    const name = e.name.split('.json')[0]
    const axiosRes = await axios.get<IMetaData>(e.download_url)
    map[name] = axiosRes.data.data
  }

  return map
}

export type IGroupedSolution = ISolution[][]

export async function groupByProblem(data: IGithubData[], meta: IBojData[]): Promise<IGroupedSolution> {
  const group = new Map<string, ISolution[]>()

  meta.forEach(metaData => group.set(metaData.problem, []))

  for (const githubData of data) {
    const { number, name, team, lang } = titleSeparator(githubData.name)
    if (!group.has(number)) {
      group.set(number, [])
    }
    const metaData = meta.find(it => it.problem == number)

    group.get(number)?.push({
      id: number,
      title: metaData?.title ?? '',
      class: metaData?.class ?? '',
      level: metaData?.level ?? 'NONE',
      github_url: githubData.html_url,
      problem_url: `https://www.acmicpc.net/problem/${number}`,
      content_url: githubData.download_url,
      name,
      lang,
      team,
    })
  }

  const res: IGroupedSolution = []
  group.forEach(value => {
    if (value.length > 0) res.push(value)
  })

  return res
}
