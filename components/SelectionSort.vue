<script setup lang="ts">
import {useSortableList} from "~/composables/useSortableList";
import SortableList from "~/components/SortableList.vue";

const {sortableList} = useSortableList()
const nowI = ref(0)
const nowJ = ref(0)
const minIndex = ref(0)

async function selectionSort() {
  for (let i = 0; i < sortableList.length; i++) {
    nowI.value = i
    minIndex.value = i

    for (let j = i + 1; j < sortableList.length; j++) {
      nowJ.value = j
      if (sortableList[minIndex.value] > sortableList[j]) {
        minIndex.value = j
      }
      await waitForTimeout(17)
    }
    swap(i, minIndex.value, sortableList)
  }
}

</script>

<template>
  <SortableList :sortable-list="sortableList" @start="selectionSort"
                :is-active="(item, index) => nowI === index"
                :is-second="(item, index) => nowJ === index"
                :class-list="(item, index) => minIndex === index ? 'bg-min' : ''"
  ></SortableList>
</template>

<style lang="less">
.sortable-contain .sortable-item.bg-min {
  background-color: brown;
}
</style>
