const { URL } = require('url')

/**
 * The utility functions in this file are taken directly from the
 * netlify-shortener src/utils.js file and should not be modified to
 * ensure easier manual merging in the future
 */

export const validateUnique = (short, contents) => {
  const links = parseLinks(contents)
  const [, existingLink] = links.find(([s]) => s === short) || []
  if (existingLink) {
    throw new Error(
      `A link with this code already exists. It points to ${existingLink}`
    )
  }
}

export const parseLinks = (contents) => {
  return contents.split('\n').map((r) => {
    if (!r.trim()) {
      return ['', '']
    }
    const [, short, long] = r.trim().match(/^(.*)\s+(.*)$/) || [r, r.trim(), '']
    return [short.trim(), long.trim()]
  })
}

export const validateUrl = (url) => {
  new URL(url)
}

export const addProtocolIfMissing = (url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    return `https://${url}`
  }
}

export const generateCode = () => {
  let text = ''
  const possible = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const format = (contents) => {
  const links = parseLinks(contents)

  const longestLength = links.reduce((length, [short]) => {
    if (short.startsWith('/') && short.length > length) {
      return short.length
    }
    return length
  }, 0)

  const formattedLinks = links.map(([short, long]) => {
    if (short.startsWith('/')) {
      return `${short.padEnd(longestLength, ' ')}   ${long}`
    } else {
      return `${short}${long}`
    }
  })

  return formattedLinks.join('\n')
}
