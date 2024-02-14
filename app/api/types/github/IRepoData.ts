interface IRepoData {
  name: string
  path: string
  url: string
  html_url: string
  download_url: string
  content?: string
}

interface IRepoFetch {
  data: IRepoData[]
}

export type { IRepoData, IRepoFetch }
