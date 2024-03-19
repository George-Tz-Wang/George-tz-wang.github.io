<script setup lang="ts">
import Vditor from 'vditor'
import "vditor/dist/index.css"

const vditor = ref()
onMounted(() => {
  if (vditor.value) {
    vditor.value = new Vditor('vditor', {
      after() {
        vditor.value.setValue('# Hello Vditor\n\nWelcome to use Vditor.')
      }
    })
  }
})
function save() {
  const md = vditor.value.getValue()
  console.log(md)
}
</script>

<template>
  <div>
    <div><button @click="save">save</button></div>
  <div ref="vditor" id="vditor" />
  </div>
</template>
