import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { faArrowUpRightFromSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import { ISolution } from '../types/ISolution'
import axios from 'axios'

interface IProps {
  data: ISolution
}

export default function ContentList({ data }: IProps) {
  const [copied, setCopied] = useState(false)

  const copyHandler = async () => {
    const raw = await axios.get<string>(data.content_url)
    navigator.clipboard.writeText(raw.data).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    })
  }

  return (
    <li className="hover:border-blue-600 transition-all grid items-center grid-cols-contentList gap-1 p-2 border w-full text-sm rounded-sm">
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{data.id}</p>
      <p></p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{data.team}</p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{data.name}</p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{data.lang}</p>
      <button
        className="w-7 h-7 border data-[copied=true]:text-blue-600 data-[copied=true]:border-blue-600 rounded-sm transition-all hover:border-blue-600 hover:text-blue-600"
        onClick={copyHandler}
        data-copied={copied}
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
      </button>
      <Link
        className="w-7 h-7 border rounded-sm flex items-center justify-center transition-all hover:border-blue-600"
        href={data.github_url}
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link
        className="w-7 h-7 border rounded-sm flex items-center justify-center transition-all hover:border-blue-600 hover:text-blue-600"
        href={data.problem_url}
        target="_blank"
      >
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Link>
    </li>
  )
}
