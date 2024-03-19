import type {RouteRecordRaw} from "vue-router";

export function useRoutes(filterName?: string) {
  const router = useRouter()
  return reactiveComputed((): readonly RouteRecordRaw[] => {
    const routes = router.options.routes.filter(item => item.meta?.menu)
    if (filterName) {
      return find(filterName.split('/').filter(_ => !!_), routes)
    }
    return routes
  })
}

function find(filterNameList: string[], routes: readonly RouteRecordRaw[]): RouteRecordRaw[] {
  const _route = routes.find(item => item.name === [...filterNameList].pop() && item.meta?.menu)
  if (!_route) {
    throw new Error('route not found')
  }
  if (filterNameList.length > 1) {
    if (!_route.children) {
      throw new Error('route not found')
    }
    return find(filterNameList, _route.children)
  }
  return _route.children || [_route]
}
