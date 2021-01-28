import { clone, add, commit, push } from 'isomorphic-git'
import fs from 'fs'
import os from 'os'
import http from 'isomorphic-git/http/node'
import { validateUnique, format } from './netlify-shortener-utils'
import { formatUrl, formatEndpoint } from './utils'
import readPkg from 'read-pkg-up'

const shorten = async (
  url,
  repoUrl,
  { endpoint, onAuth, repoBranch, commitAuthorName, commitAuthorEmail }
) => {
  const dir = os.tmpdir()
  await clone({
    fs,
    dir,
    http,
    corsProxy: 'https://cors.isomorphic-git.org',
    url: repoUrl,
    ref: repoBranch,
    onAuth,
  })

  const formattedEndpoint = formatEndpoint(endpoint)
  const formattedUrl = formatUrl(url)

  const redirectsFile = fs.readFileSync(`${dir}/_redirects`)

  validateUnique(formattedUrl, redirectsFile)

  const updatedRedirectsFile = `${formattedEndpoint} ${formattedUrl}\n${redirectsFile}`
  fs.writeFileSync(redirectsFile, format(updatedRedirectsFile))

  await add({ fs, dir, filePath: '_redirects' })

  const { packageJson } = readPkg.sync({
    cwd: dir,
  })

  const author = {
    name: commitAuthorName ?? packageJson.author.name,
    email: commitAuthorEmail ?? packageJson.author.email,
  }

  // TODO Handle case where no author credentials are prodived

  const message = `${formattedEndpoint} -> ${formattedUrl}`

  await commit({ fs, dir, author, message })
  await push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: repoBranch,
    onAuth,
  })

  const baseUrl =
    packageJson.baseUrl ||
    packageJson.homepage ||
    'https://update-homepage-in-your-package.json'

  return `${baseUrl}${formattedEndpoint}`
}

export default shorten
