import {
  addProtocolIfMissing,
  generateCode,
  validateUrl,
} from './netlify-shortener-utils'

export const formatEndpoint = (endpoint) => {
  if (endpoint) {
    endpoint = encodeURIComponent(
      endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
    )
  }
  return `/${endpoint || generateCode()}`
}

export const formatUrl = (url) => {
  const formattedUrl = addProtocolIfMissing(url)
  validateUrl(formattedUrl)
  return formattedUrl
}
