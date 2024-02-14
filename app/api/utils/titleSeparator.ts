const SEPARATOR = '_'

interface IRepoTitleInfo {
  number: string
  team: string
  name: string
}

export function titleSeparator(title: string): IRepoTitleInfo {
  const removed = title.split('.')[0]
  const splited = removed.split(SEPARATOR)

  const number = splited[0]
  const team = splited[1]
  const name = splited[2]

  return { number, name, team }
}
