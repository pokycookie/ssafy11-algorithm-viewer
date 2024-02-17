import { IRepoData } from '../github/types/IRepoData'
import { titleSeparator } from './titleSeparator'

export interface IGroupedRepoData {
  [key: string]: IRepoData[]
}

export function groupByProblem(data: IRepoData[]): IGroupedRepoData {
  const map: IGroupedRepoData = {}

  data.forEach(e => {
    const title = titleSeparator(e.name)
    if (!map.hasOwnProperty(title.number)) {
      map[title.number] = []
    }
    map[title.number].push(e)
  })

  return map
}

export function groupByUser(data: IRepoData[]): IGroupedRepoData {
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
