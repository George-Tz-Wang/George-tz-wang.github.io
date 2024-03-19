<script setup lang="ts">

import {ArrowLeftBold, ArrowRightBold} from "@element-plus/icons-vue";
const props = defineProps<{
  images: string[]
}>()

const active = ref(0)
const thumbnail = ref<HTMLElement>()
const showTransition = ref(true)

watch(active, (index) => {
  const child = thumbnail.value?.children[index] as HTMLElement
  if (child) {
    thumbnail.value?.scrollTo({ left: child.offsetLeft - thumbnail.value?.clientWidth / 2 + child.clientWidth / 2, behavior: 'smooth'})
    return
  }
  thumbnail.value?.scrollTo({ left: 0, behavior: 'smooth' })
}, { immediate: true })

const imageViewStyle = computed(() => {
  return {
    transform: `translate(${-(active.value + 1) * 440}px, 0)`,
  }
})

function prev() {
  console.log('prev', active.value)
  if (active.value === 0) {
    showTransition.value = false
    active.value = props.images.length
    setTimeout(() => {
      active.value = props.images.length - 1
      showTransition.value = true
    })
  } else {
    active.value = (props.images.length + active.value - 1) % props.images.length
  }
}

function next() {
  console.log('next', active.value)
  if (active.value === props.images.length - 1) {
    showTransition.value = false
    active.value = -1
    setTimeout(() => {
      active.value = 0
      showTransition.value = true
    }, 10)
  } else {
    active.value = (active.value + 1) % props.images.length
  }
}

function setActive(index: number) {
  active.value = index
}

</script>

<template>
<div class="flex flex-col items-center w-[440px]">
  <div class="flex items-center justify-center relative">
    <el-button :icon="ArrowLeftBold" class="z-10 absolute left-[30px]"
               circle size="large" @click="prev" />
    <el-button :icon="ArrowRightBold" class="z-10 absolute right-[30px]"
               circle size="large" @click="next"/>

    <div class="w-[440px] h-[600px] overflow-hidden z-1 shrink-0">
      <div class="flex items-center w-fit showcase-contain"
           :style="imageViewStyle"
           :class="{ 'no-transition': !showTransition }">
        <img  :src="images[images.length - 1]" alt="" class="w-[440px] h-[600px] object-cover">
        <img v-for="image in images" class="w-[440px] h-[600px] object-cover" :key="image" :src="image" alt="">
        <img  :src="images[0]" alt="" class="w-[440px] h-[600px] object-cover">
      </div>
    </div>
  </div>

  <div class="flex items-center justify-start mb-[26px] mt-3 gap-x-1 overflow-hidden max-w-full" ref="thumbnail">
    <img v-for="(image, index) in images" :key="image"
         :src="image" alt="" class="w-[76px] h-[90px] object-cover img-list-item"
         :class="{ active: active == index }"
         @click="setActive(index)">
  </div>
</div>
</template>

<style scoped lang="less">

.showcase {
  border: 5px solid black;
  background: white;
  height: fit-content;
}

.pictures-enter-from,
.pictures-leave-to {
  width: 0;
}

.pictures-enter-active,
.pictures-leave-active {
  transition: all 0.3s linear;
}

.pictures-enter-to,
.pictures-leave-from {
  width: 720px;
}
.showcase-contain {
  transition: all 0.3s linear;
}
.no-transition {
  transition: none;
}

.normal {
  height: 13px;
  flex-grow: 1;
  min-width: 0;
  background: #d8d8d8;
  border-radius: 4px;
  &.active {
    background: black;
    &.el-button:focus,
    &.el-button:hover {
      background: black;
    }
  }
  &.el-button:focus,
  &.el-button:hover {
    background: #d8d8d8;
  }
}

.img-list-item {
  border: 2px solid transparent;
  cursor: pointer;
  &.active {
    border-color: #d23f31;
  }
}
</style>
