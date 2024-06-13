export function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64')
      .toString('ascii')
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload)
}

export function beforeRouteEnter(acceptRole) {
  if (localStorage.token) {
    const jwtPayload = parseJwt(localStorage.token)
    if (jwtPayload.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('avatar')
      return false
    }
    if (acceptRole) {
      return acceptRole.includes(jwtPayload.role)
    }
    return true
  } else {
    return false
  }
}
