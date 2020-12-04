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
  if (typeof routeRoles === 'undefined') return true
  if (Array.isArray(routeRoles) && routeRoles.length === 0) return true

  return userRoles.some(role => routeRoles.includes(role))
}

export function isValidEmail(val) {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val)
}

export function isValidPhoneNo(val) {
  const phoneNoPattern = /^(\+?6?0)[0-46-9]-*[0-9]{7,8}$/
  const mobileNoPattern = /^(\+?6?0?1)[0-46-9]-*[0-9]{7,8}$/
  return phoneNoPattern.test(val) || mobileNoPattern.test(val)
}
