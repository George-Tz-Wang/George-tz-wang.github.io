<script setup lang="ts">
import {useSortableList} from "~/composables/useSortableList";
import _ from 'lodash'
const { sortableList, shuffle } = useSortableList(10)


const nowI = ref(0)
const nowJ = ref(-1)
const active = ref(-1)
const second = ref(-1)
const sorting = ref(false)

function init() {
  nowI.value = -1
  nowJ.value = -1
  active.value = -1
  second.value = -1
}

function shuffleSort() {
  shuffle()
}

async function bubbleSort() {
  if (sorting.value) {
     return
  }
  sorting.value = true
  // 每次从0开始遍历，直到length-1-i，因为length-1-i到i已经是有序的数据
  for (let i = 1; i < sortableList.length; i++) {
    nowI.value = i
    let j = 0
    for (; j < sortableList.length - i; j++) {
      if (!sorting.value) { return }
      if (i > 0) {
        await waitForTimeout(500)
      }
      nowJ.value = j
      active.value = sortableList[j]
      second.value = sortableList[j + 1]
      if (sortableList[j] > sortableList[j + 1]) {
        swap(j, j + 1, sortableList)
      }
      await waitForTimeout(1000)
    }
  }
  init()
}

function stop() {
  sorting.value = false
  init()
}

function swap<T>(index1: number, index2: number, list: T[]) {
  const temp = list[index1]
  list[index1] = list[index2]
  list[index2] = temp
}

</script>

<template>
  <client-only>
    <div>
      <ContentDoc path="/bubble-sort" class="markdown-body" />
      <div>
        <button @click="bubbleSort()" :disabled="sorting">Start</button>
        <button @click="stop" :disabled="!sorting">Stop</button>
        <button @click="shuffleSort" :disabled="sorting">Shuffle</button>
        <div>
          <span>第{{ nowI }}轮</span>
        </div>
      </div>
      <transition-group name="list" tag="div" class="flex items-end gap-x-1 sortable-contain">
      <span v-for="(item, index) in sortableList" :key="item"
            class="sortable-item"
            :class="{
              sorted: index > sortableList.length - nowI,
              'now-index': active === item,
              active: active === item,
              'second-active': second === item,
            }"
            :style="{ '--height': item * 5 + 'px', '--value': item, '--index': index }"
      ></span>
      </transition-group>
    </div>
  </client-only>
</template>

<style scoped lang="less">
.sortable-contain {
  min-height: 300px;
  max-height: 100vh;

  .sortable-item {
    height: var(--height);
    flex-grow: 1;
    background-color: cadetblue;
    position: relative;
    //transition: all 0.01s linear;

    &::after {
      counter-reset: variable var(--value);
      content: counter(variable);
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, 0);
      height: 16px;
      width: 16px;
      text-align: center;
      font-size: 16px;
    }

    &.now-index {
      &::before {
        content: '↓';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translate(-50%, 0);
        height: 16px;
        width: 16px;
        text-align: center;
        font-size: 16px;
      }
    }

    &.active {
      background-color: chocolate;
      bottom: 10px;
    }

    &.second-active {
      background-color: chartreuse;
      bottom: 10px;
    }

    &.sorted {
      background-color: rgba(cadetblue, 30%);
    }
  }
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
  &.second-active {
    transition: all 0.5s ease 0.1s;
  }
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
