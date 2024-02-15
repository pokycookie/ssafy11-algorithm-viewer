import { IRepoData } from '../github/types/IRepoData'
import { titleSeparator } from './titleSeparator'

export interface IGroupedRepoData {
  [key: string]: IRepoData[]
}

export default function dataCollector(data: IRepoData[]): IGroupedRepoData {
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
