import { UPLOAD_PRESET, CLOUD_NAME } from '@/consts/cloudinary'

export const fileUploader = (input) => {
  const post = new FormData()
  post.append('file', input)
  post.append('upload_preset', UPLOAD_PRESET)
  post.append('cloud_name', CLOUD_NAME)
  return post
}
