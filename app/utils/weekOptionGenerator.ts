import { IRepoData } from '../github/types/IRepoData'

interface IOptions {
  value: string
  label: string
}

export default function weekOptionGenerator(data: IRepoData[]): IOptions[] {
  return data.map(e => {
    return { value: e.name, label: e.name }
  })
}
