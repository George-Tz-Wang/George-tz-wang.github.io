<script setup lang="ts">
const router = useRouter()
const routes = computed(() => router.options.routes.find(route => route.name === 'sort')!.children!.filter(item => item.meta!.menu))
const tabs = computed(() => routes.value.map(item => ({...item, label: item.name })))

const route = useRoute()
const active = computed(() => route.name)
</script>

<template>
  <div>
    {{ routes }}
    <el-tabs v-model="active">
      <el-tab-pane v-for="tab in tabs" :key="tab.name"
                   :name="tab.name" :label="tab.name">
        <template #label>
          <NuxtLink :to="tab.path">
            {{ tab.name }}
          </NuxtLink>
        </template>
      </el-tab-pane>
    </el-tabs>
    <NuxtPage></NuxtPage>
  </div>
</template>

<style scoped>

</style>
