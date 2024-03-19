export function waitForTimeout(time: number, signal?: () => void) {
  let timeout = null

  return new Promise((resolve) => {
    timeout = setTimeout(resolve, time)
  })
}

const timeout = {

}
