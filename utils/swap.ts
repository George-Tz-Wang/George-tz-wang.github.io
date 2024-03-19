import {waitForTimeout} from "~/utils/waitForTimeout";

export function swap(index1: number, index2: number, list: Array<any>) {
  const temp = list[index1]
  list[index1] = list[index2]
  list[index2] = temp
}
