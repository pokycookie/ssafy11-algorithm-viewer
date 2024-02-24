interface IGithubData {
  name: string
  path: string
  url: string
  html_url: string
  download_url: string
  content?: string
}

interface IGithubFetch {
  data: IGithubData[]
}

export type { IGithubData, IGithubFetch }
