interface IBojData {
  class: string
  problem: string
  title: string
  level: string
}

interface IMetaData {
  data: IBojData[]
}

interface IGroupedBojData {
  [week: string]: IBojData[]
}

export type { IMetaData, IBojData, IGroupedBojData }
