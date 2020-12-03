import { hasPermission } from '../utils'

// Generate menu list based on user permissions and menu configuration

export default async({ store }) => {
  // Safely deep clone the state without reference so we can modify it without mutating vuex data
  // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
  const menuConfig = JSON.parse(JSON.stringify(store.getters.menus))
  const userPermissions = store.getters.permissions

  if (typeof userPermissions === 'undefined') return
  if (userPermissions.includes('SKAllPermissions')) return

  const accessibleMenus = menuConfig.filter(menu => hasPermission(userPermissions, menu.permissions))
  for (const menu of accessibleMenus) {
    for (const button of menu.buttons) {
      button.tos = button.tos.filter(to => hasPermission(userPermissions, to.permissions))
    }

    // If all button.tos are not accessible, filter the button out
    menu.buttons = menu.buttons.filter(button => button.tos.length)
  }
  store.dispatch('SetMenu', accessibleMenus)
}
