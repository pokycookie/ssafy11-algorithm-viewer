import { useEffect, useState } from 'react'
import { IRepoData } from '../types/github/IRepoData'
import { titleSeparator } from '../utils/titleSeparator'

interface IProps {
  data: IRepoData
}

export default function ContentList(props: IProps) {
  const [number, setNumber] = useState('')
  const [team, setTeam] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const titleData = titleSeparator(props.data.name)
    setNumber(titleData.number)
    setTeam(titleData.team)
    setName(titleData.name)
  }, [props.data])

  return (
    <li className="grid grid-cols-contentList gap-1 p-2 border max-w-lg w-full text-sm rounded-sm m-1">
      <p>{number}</p>
      <p>{team}</p>
      <p></p>
      <p>{name}</p>
    </li>
  )
}
