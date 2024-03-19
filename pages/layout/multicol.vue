<script setup lang="ts">
const items = reactive<{id: number, value: string, height: string}[]>([])

for (let i = 0; i < 10; i++) {
  items.push({
    id: i,
    value: `item ${i}`,
    height: (Math.random() * 300).toFixed(0)
  })
}
</script>

<template>
<div class="columns-3">
  <div v-for="item in items" :key="item.id" class="item" :style="{ '--height': item.height + 'px' }">{{ item.value }}</div>
</div>
</template>

<style scoped lang="less">
.item {
  height: var(--height);
  background-color: cadetblue;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
}
</style>
