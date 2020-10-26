import { getToken } from './../datasources/localstorage.storage'
import generateSidebarLinks from './sidebar'
import { hasPermission } from '../utils'

export default async({ app, router, store, Vue }) => {
  // URLs which gonna be public access
  const whiteListURL = ['/login', '/register', '/user', '/session', '/user', '/asset', '/dashboard']

  router.beforeEach(async(to, from, next) => {
    if (getToken(process.env.MAIN_BE_TOKEN)) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (store.getters.roles.length === 0) {
          try {
            await store.dispatch('GetInfo')
            generateSidebarLinks({ router, store })

            next({ ...to, replace: true })
          } catch (err) {
            console.log(err)
            store.dispatch('Logout')
              .then(() => {
                console.log('logout')
                next({ path: '/login' })
              })
          }
        } else {
          next()
        }
      }
    } else {
      if (whiteListURL.includes(to.path)) {
        next()
      } else {
        next('/login')
      }
    }
  })
}
