<script setup lang="ts">
import RouteTabs from "~/components/RouteTabs.vue";
definePageMeta({
  name: "Sort",
  menu: true,
})

</script>

<template>
  <div>
    <RouteTabs route-name="Sort" />
    <NuxtPage></NuxtPage>
  </div>
</template>
