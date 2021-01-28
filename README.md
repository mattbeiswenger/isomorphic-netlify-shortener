<h1 align="center">isomorphic-netlify-shortener</h1>

> A pure JavaScript implementation of [netlify-shortener](https://github.com/kentcdodds/netlify-shortener) for node environments

## Motivation

While [netlify-shortener](https://github.com/kentcdodds/netlify-shortener) is an awesome library that allows you to quickly setup a workflow for shortening urls on your custom domain, it's primarily a cli tool and is constrained to usage at a computer with proper git credentials.

isomorphic-netlify-shortener brings the functionality of netlify-shortener to node environments to add flexibility to your workflow.

Since there's already heavy reliance on Netlify, this package is catered towards and recommended to be used with [Netlify Functions](https://www.netlify.com/products/functions/).

## Install

```
npm install isomorphic-netlify-shortener
```

## Usage

```js
const shorten = require('isomorphic-netlify-shortener')

const url = 'https://google.com'
const repoUrl = 'https://github.com/${githubUsername}/${githubRepo}'

const link = shorten(url, repoUrl)
```

## API

### shorten(url, repo, options?)

#### url

Type: `string`

URL to shorten

---

#### repoUrl

Type: `string`

URL of desired repository containing `_redirects` file

---

#### options

Type: `object`

<div style="margin-left: 2rem">

  #### endpoint

  Type: `string`

  Default: Random 6 digit alphanumerical string
  
  Endpoint to shorten `url` to

  ---

  #### onAuth

  Type: `function`

  Default: Throws error if repository is private and callback not provided

  Callback function compatible with [isomorphic-git](https://isomorphic-git.org/docs/en/onAuth)

  Required if repository located at `repoUrl` is a private repository

  ---

  #### repoBranch

  Type: `string`

  Default: Repository's default branch

  Repository branch to commit and push to

  ---

  #### commitAuthorName

  Type: `string`

  Default: Author name in `package.json` from repository located at `repoUrl`

  Author name for git commit

  ---

  #### commitAuthorEmail

  Type: `string`

  Default: Author email in `package.json` from repository located at `repoUrl`

  Author email for git commit
  
</div>