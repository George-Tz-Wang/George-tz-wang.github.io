import axios from 'axios'

export default defineEventHandler(async (event) => {
  const { data } = await axios.get('https://picsum.photos/v2/list')
  return data
})
