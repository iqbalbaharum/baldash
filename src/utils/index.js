/**
 * Checks if user has the role needed to access route.
 *
 * @argument {string[]} userRoles - Roles of current user
 * @argument {string[]} routeRoles - Roles required to access route
 *
 * @example
 * // returns true
 * hasPermission(['admin', 'user'], ['admin'])
 */
export function hasPermission(userRoles, routeRoles) {
  if (!routeRoles) return true

  return userRoles.some(role => routeRoles.includes(role))
}
