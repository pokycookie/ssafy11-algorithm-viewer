import { useEffect, useState } from 'react'
import { IRepoData } from '../github/types/IRepoData'
import { titleSeparator } from '../utils/titleSeparator'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { faArrowUpRightFromSquare, faCheck, faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  data: IRepoData
}

export default function ContentList(props: IProps) {
  const [number, setNumber] = useState('')
  const [team, setTeam] = useState('')
  const [name, setName] = useState('')
  const [lang, setLang] = useState('')
  const [copied, setCopied] = useState(false)

  const copyHandler = async () => {
    const raw = await axios.get(props.data.download_url)
    navigator.clipboard.writeText(raw.data).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    })
  }

  useEffect(() => {
    const titleData = titleSeparator(props.data.name)
    setNumber(titleData.number)
    setTeam(titleData.team)
    setName(titleData.name)
    setLang(titleData.lang)
  }, [props.data])

  return (
    <li className="hover:border-blue-600 transition-all grid items-center grid-cols-contentList gap-1 p-2 border w-full text-sm rounded-sm">
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{number}</p>
      <p></p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{team}</p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">{lang}</p>
      <button
        className="w-7 h-7 border data-[copied=true]:text-blue-600 data-[copied=true]:border-blue-600 rounded-sm transition-all hover:border-blue-600 hover:text-blue-600"
        onClick={copyHandler}
        data-copied={copied}
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
      </button>
      <Link
        className="w-7 h-7 border rounded-sm flex items-center justify-center transition-all hover:border-blue-600"
        href={props.data.html_url}
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link
        className="w-7 h-7 border rounded-sm flex items-center justify-center transition-all hover:border-blue-600 hover:text-blue-600"
        href={`https://www.acmicpc.net/problem/${number}`}
        target="_blank"
      >
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Link>
    </li>
  )
}
