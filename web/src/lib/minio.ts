import {MINIO_ACCESS_KEY, MINIO_SECRET_KEY, NODE_ENV} from '$env/static/private'
import { Client } from 'minio'

export const client = new Client({
  endPoint: 'minio1',
  port: 9000,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
  useSSL: NODE_ENV === 'production'
})

export const getPutAvatarUrl = async (user_id: string) => {
  const url = await client.presignedPutObject('avatars', user_id).catch((e) => {
    console.log(e)
    throw e
  })
  return url
}