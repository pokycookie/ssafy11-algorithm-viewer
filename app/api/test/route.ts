import { Octokit } from 'octokit'
import dotenv from 'dotenv'

dotenv.config()

const octokit = new Octokit({
  auth: process.env.OCTOKIT_AUTH,
})

export async function GET(req: Request) {
  const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'ssafy11-study',
    repo: 'test',
    path: 'src/week2',
  })
  const data = res.data
  return Response.json({ data })
}
