'use client'

import axios from 'axios'
import useSWR from 'swr'
import { IRepoFetch } from './api/types/github/IRepoData'
import ContentList from './api/ui/contentList'

const fetcher = (args: string) => axios.get<IRepoFetch>(args).then(res => res.data)

export default function Home() {
  const { data } = useSWR('api/week2', fetcher)

  const contentHandler = async (uri: string) => {
    const raw = await axios.get(uri)
    navigator.clipboard.writeText(raw.data).then(() => {
      console.log('copied!')
    })
  }

  return (
    <main className="w-vw">
      {data ? (
        <ul className="w-full max-w-xl">
          {data.data.map((e, i) => {
            return (
              <ContentList key={i} data={e} />
              // <li key={i}>
              //   <a href={e.html_url} target="_blank">
              //     {e.name}
              //   </a>
              //   <button onClick={() => contentHandler(e.download_url)}>download</button>
              // </li>
            )
          })}
        </ul>
      ) : null}
    </main>
  )
}
