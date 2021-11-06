import { api } from './sanity.json'

// validation for maximum allowable image filesize
// image param is passed from Rule.custom() and optional max param is integer of KB  
export const maxSize = async (image, max = 100) => {
  if (!image) return true
  const [type, id, dim, ext] = image.asset._ref.split('-')
  const imageURL = `https://cdn.sanity.io/images/${api.projectId}/${api.dataset}/${id}-${dim}.${ext}?q=100`
  const res = await fetch(imageURL, {method: 'HEAD'})
  const size = Number(res.headers.get("content-length")) / 1000
  console.log(type, size, 'KB')
  return size <= max || `current image is ${Math.ceil(size)}KB and must not exceed ${max}KB` 
}

export const isSlug = (str, options = null) => {
  const slash = str.startsWith('/')
  const isStartOK = options?.leadingSlash ? slash : !slash
  const isBodyOK = str.match(/[\s]/g) === null
  if (isStartOK && isBodyOK) return true
  let errors = []
  if (!isStartOK) errors.push(`leading slash ${ !slash ? 'is missing' : '' }`)
  if (!isBodyOK) errors.push('illegal characters')
  return errors.join(' and ')
}