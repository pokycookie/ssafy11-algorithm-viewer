import { IGithubData } from '../types/IGithubData'
import { IGroupedSolution } from './dataCollector'

interface IOptions {
  value: string
  label: string
}

export function weekOptionGenerator(data: IGithubData[]): IOptions[] {
  return data.map(e => {
    return { value: e.name, label: e.name }
  })
}

export function searchOptionGenerator(data: IGroupedSolution[]): IOptions[] {
  return data.map(e => {
    return { value: e.searchValue.join(' '), label: e.searchLabel }
  })
}
