<script setup lang="ts">

const count = ref(0)
const isRunning = ref(false)

async function startTimeout() {
  if (isRunning.value) {
    return
  }
  isRunning.value = true
  for (let i = 0; i < 100; i++) {
    if (!isRunning.value) { return }
    await waitForTimeout(1000)
    count.value += 1
  }
}

function stop() {
  isRunning.value = false
}

</script>

<template>
<div>
  count: {{ count }}
  <button @click="startTimeout">Start</button>
  <button @click="stop">Stop</button>
</div>
</template>
