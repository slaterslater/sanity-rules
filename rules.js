import { api } from './sanity.json'

export const maxSize = async image => {
  if (!image) return true
  const [type, id, dim, ext] = image.asset._ref.split('-')
  const imageURL = `https://cdn.sanity.io/images/${api.projectId}/${api.dataset}/${id}-${dim}.${ext}?q=100`
  const res = await fetch(imageURL, {method: 'HEAD'})
  const size = Number(res.headers.get("content-length"))
  const max = 100 * 1000 // 100KB
  console.log(type, size/1000, 'KB')
  return size <= max || `current image is ${Math.ceil(size/1000)}KB and must not exceed 100KB` 
}