'use client'

import axios from 'axios'
import useSWR from 'swr'
import { IRepoFetch } from './api/types/github/IRepoData'

const fetcher = (args: string) => axios.get<IRepoFetch>(args).then(res => res.data)

export default function Home() {
  const { data } = useSWR('api/week2', fetcher)
  console.log(data)

  const contentHandler = async (uri: string) => {
    const raw = await axios.get(uri)
    navigator.clipboard.writeText(raw.data).then(() => {
      console.log('copied!')
    })
  }

  return (
    <main className="w-screen">
      {data ? (
        <ul>
          {data.data.map((e, i) => {
            return (
              <li key={i}>
                <a href={e.html_url} target="_blank">
                  {e.name}
                </a>
                <button onClick={() => contentHandler(e.download_url)}>download</button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </main>
  )
}
