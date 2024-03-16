import axios from 'axios'
import { IGithubData } from '../types/IGithubData'
import { IBojData, IGroupedBojData, IMetaData } from '../types/IMetaData'
import { titleSeparator } from './titleSeparator'
import { ISolution } from '../types/ISolution'

export async function metaDataCollector(data: IGithubData[]): Promise<IGroupedBojData> {
  const map: IGroupedBojData = {}

  for (const e of data) {
    const name = e.name.split('.json')[0]
    const axiosRes = await axios.get<IMetaData>(e.download_url)
    map[name] = axiosRes.data.data
  }

  return map
}

export type TGrouping = 'problem' | 'user'

export type IGroupedSolution = {
  grouping: TGrouping
  searchLabel: string
  searchValue: any[]
  id: string | null
  title: string | null
  level: string | null
  class: string | null
  name: string | null
  team: string | null
  solutions: ISolution[]
}

export async function groupByProblem(data: IGithubData[], meta: IBojData[]): Promise<IGroupedSolution[]> {
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

  const res: IGroupedSolution[] = []
  group.forEach(solutions => {
    if (solutions.length > 0)
      res.push({
        grouping: 'problem',
        searchLabel: `${solutions[0].id.padEnd(5, ' ')} ${solutions[0].title}`,
        searchValue: [solutions[0].id],
        title: solutions[0].title,
        class: solutions[0].class,
        id: solutions[0].id,
        level: solutions[0].level,
        name: null,
        team: null,
        solutions,
      })
  })

  return res
}

export function groupByUser(data: IGithubData[], meta: IBojData[]): IGroupedSolution[] {
  const group = new Map<string, ISolution[]>()

  data.forEach(githubData => {
    const { name, team } = titleSeparator(githubData.name)
    group.set(`${team} ${name}`, [])
  })

  for (const githubData of data) {
    const { number, name, team, lang } = titleSeparator(githubData.name)
    const metaData = meta.find(it => it.problem == number)

    group.get(`${team} ${name}`)?.push({
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

  const res: IGroupedSolution[] = []
  group.forEach(solutions => {
    if (solutions.length > 0)
      res.push({
        grouping: 'user',
        searchLabel: `${solutions[0].team} ${solutions[0].name}`,
        searchValue: [solutions[0].team, solutions[0].name],
        title: null,
        class: null,
        id: null,
        level: null,
        name: solutions[0].name,
        team: solutions[0].team,
        solutions,
      })
  })

  return res
}
