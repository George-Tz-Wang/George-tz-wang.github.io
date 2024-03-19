<script setup lang="ts">
const props = defineProps<{
  routeName?: string
}>()

const routes = useRoutes(props.routeName)
const route = useRoute()
const active = computed({
  get() { return route.name as string },
  set(val: string) { navigateTo({ name: val }) }
})
</script>

<template>
<el-tabs v-model="active">
  <el-tab-pane v-for="tab in routes" :key="tab.name" :name="tab.name" :label="tab.name" />
</el-tabs>
</template>
