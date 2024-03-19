import axios from 'axios'

export default defineEventHandler(async (event): Promise<{download_url: string, url: string}[] > => {
  const { data } = await axios.get('https://picsum.photos/v2/list')
  return data
})
