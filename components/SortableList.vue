<script setup lang="ts">
defineProps<{
  sortableList: number[]
  isActive?: (item: number, index: number) => boolean
  isSecond?: (item: number, index: number) => boolean
  classList?: (item: number, index: number) => string | string[]
}>()

defineEmits(['start', 'stop'])

</script>

<template>
  <ClientOnly>
    <div class="flex-col flex">
      <slot name="top-bar">
        <div class="flex items-center gap-x-3">
          <button @click="$emit('start')">Start</button>
          <button @click="$emit('stop')">Stop</button>
        </div>
      </slot>
      <div class="flex items-end gap-x-1 sortable-contain">
        <span v-for="(item, index) in sortableList" :key="item"
              class="sortable-item"
              :class="[{
                  active: isActive ? isActive(item, index) : false,
                  'second-active': isSecond ? isSecond(item, index) : false,
              }, classList ? classList(item, index) : '']"
              :style="{ '--height': item + 'px', '--value': item }"
        ></span>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="less">
.sortable-contain {
  min-height: 300px;
  max-height: 100vh;


  .sortable-item {
    height: var(--height);
    flex-grow: 1;
    background-color: cadetblue;

    &.active {
      background-color: chocolate;
    }

    &.second-active {
      background-color: chartreuse;
    }
  }
}

</style>
