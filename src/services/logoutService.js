import { decodeToken, revokeToken } from "token-auth-edu"

export class LogoutService {

  logoutUser (token, reason = 'User logged out') {
    this.#validateToken(token)

    const payload = this.#decodeToken(token)
    this.#revokeToken(payload.jti, reason)

    return true
  }

  // private methods

  #validateToken(token) {
    if (!token) {
      throw new Error('No token provided')
    }
  }

  #decodeToken (token) {
    return decodeToken(token)
  }

  #revokeToken (jti, reason) {
    revokeToken(jti, reason)
  }
}
