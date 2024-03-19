import { resolve } from 'node:path'
import { statSync } from 'node:fs'

export default defineEventHandler(async (e) => {
  const pathDir = getRouterParam(e, 'page')
  // const dirPath = resolve('/pages', pathDir)
  // console.log({__dirname, pathDir, dirPath})
  // console.log(statSync(dirPath))
  return ""
})
