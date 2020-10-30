// import { getToken } from './../datasources/localstorage.storage'
// import generateSidebarLinks from './sidebar'
// import { hasPermission } from '../utils'

export default async({ router, store }) => {
  // URLs which gonna be public access
  // const whiteListURL = ['/login', '/register']

  router.beforeEach(async(to, from, next) => {
    // No token stored (not logged in)
    /**
    if (!getToken(process.env.MAIN_BE_TOKEN)) {
      if (whiteListURL.includes(to.path)) {
        next()
        return
      }
      next('/login')
      return
    }

    // Redirect to index page if user wants to access login page after already logged in
    if (to.path === '/login') {
      next({ path: '/' })
      return
    }

    const userRoles = store.getters.roles

    if (userRoles.length === 0) {
      try {
        await store.dispatch('GetInfo')
        generateSidebarLinks({ router, store })

        next({ ...to, replace: true })
      } catch (err) {
        // Logout if jwt token has expired
        console.log(err)
        await store.dispatch('Logout')

        console.log('logout')
        next({ path: '/login' })
      }

      return
    }

    if (!hasPermission(userRoles, to.meta.roles)) {
      next({ path: '/401' })
      return
    }
    **/

    next()
  })
}
