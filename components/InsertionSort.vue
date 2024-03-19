<script setup lang="ts">
import SortableList from "~/components/SortableList.vue";
import {useSortableList} from "~/composables/useSortableList";

const {sortableList} = useSortableList()

const nowI = ref(0)
const nowJ = ref(0)

function isActive(item: number, index: number) {
  return index === nowI.value
}

function isSecond(item: number, index: number) {
  return index == nowJ.value
}
async function insertionSort() {
  for (let i = 1; i < sortableList.length; i++) {
    const temp = sortableList[i]
    nowI.value = i
    let j = i - 1
    for (; j >= 0; j--) {
      nowJ.value = j
      if (sortableList[j] > temp) {
        swap(j, j + 1, sortableList)
      } else {
        break
      }
      await waitForTimeout(20)
    }
    sortableList[j+1] = temp
  }
}
</script>

<template>
  <SortableList :sortable-list="sortableList" :is-active="isActive" :is-second="isSecond" @start="insertionSort"></SortableList>
</template>
