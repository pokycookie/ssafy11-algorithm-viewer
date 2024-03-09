import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { faArrowUpRightFromSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import { ISolution } from '../types/ISolution'
import axios from 'axios'
import Image from 'next/image'

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
      <div className="w-full flex gap-2 font-normal items-center text-sm shrink">
        <Image className="w-3" src={`/img/icon/${data.level}.svg`} alt={data.level ?? ''} width={15} height={15} />
        <p className="w-11 overflow-hidden text-ellipsis whitespace-nowrap">{data.id}</p>
        <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{data.title}</p>
      </div>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap shrink-0">{data.team}</p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap shrink-0">{data.name}</p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap shrink-0">{data.lang}</p>
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
