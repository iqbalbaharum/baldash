import { hasPermission } from '../utils'

// Generate sidebar list based on user roles and router configuration

export default async({ router, store }) => {
  const links = []

  const routes = router.options.routes.filter(element => element.path === '/')

  if (routes.length === 1) {
    const userRoles = store.getters.roles

    routes[0].children.forEach(route => {
      if (!route.meta.sidebar) return

      const routeRoles = route.meta.roles
      if (Array.isArray(routeRoles) && !routeRoles.length) {
        links.push(route)
        return
      }

      if (hasPermission(userRoles, routeRoles)) {
        links.push(route)
      }
    }
    )
  }

  // store.dispatch('SetMenu', links)
}
