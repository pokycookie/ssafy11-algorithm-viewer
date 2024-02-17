const SEPARATOR = '_'

interface IRepoTitleInfo {
  number: string
  team: string
  name: string
  lang: string
}

export function titleSeparator(title: string): IRepoTitleInfo {
  try {
    const ext = title.split('.')
    const splited = ext[0].split(SEPARATOR)

    if (splited.length !== 3) throw new Error()

    const number = splited[0]
    const team = splited[1]
    const name = splited[2]
    const lang = getLangType(ext[1])

    return { number, name, team, lang }
  } catch {
    return { number: 'ERROR', name: '', team: '', lang: '' }
  }
}

function getLangType(lang: string): string {
  switch (lang) {
    case 'java':
      return 'Java'
    case 'c':
    case 'cc':
    case 'cp':
    case 'cpp':
      return 'C++'
    case 'py':
      return 'Python'
    default:
      return ''
  }
}
