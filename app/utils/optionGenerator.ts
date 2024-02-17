import { IRepoData } from '../github/types/IRepoData'
import { IGroupedRepoData } from './dataCollector'

interface IOptions {
  value: string
  label: string
}

export function weekOptionGenerator(data: IRepoData[]): IOptions[] {
  return data.map(e => {
    return { value: e.name, label: e.name }
  })
}

export function searchOptionGenerator(data: IGroupedRepoData): IOptions[] {
  return Object.keys(data).map(key => {
    return { value: key, label: key }
  })
}
