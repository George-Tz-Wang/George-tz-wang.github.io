<script setup lang="ts">
import ImageShowCase from "~/components/ImageShowCase.vue";
const { data, pending } = await useFetch('/api/image-mock')
const images = computed(() => data.value?.map(item => item.download_url) ?? [])
</script>

<template>
  <ImageShowCase :images="images" v-loading="pending" />
</template>
