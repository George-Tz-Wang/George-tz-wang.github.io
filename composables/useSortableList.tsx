import _ from "lodash";
import "~/assets/styles/index.less"
import {reactiveComputed} from "@vueuse/shared";

export function useSortableList(length: number = 100) {
  const ret = ref<number[]>([])
  for (let i = 1; i <= length; i++) {
    ret.value.push(i)
  }
  ret.value = _.shuffle(ret.value)
  const shuffle = _.debounce(() => {
    ret.value = _.shuffle(ret.value)
  }, 100)
  return { sortableList: reactiveComputed(() => ret.value), shuffle }
}
