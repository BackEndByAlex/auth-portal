import { verifyToken } from "token-auth-edu"

/**
 * A middle man protecting routes that require authentication.
 */
export class AuthMiddleware {

  /**
   * Check if the request has a valid authentication token.
   */
  static authenticate(req, res, next) {
    try { 
      const token = req.cookies.authToken

      AuthMiddleware.#validateToken(token)

      const result = verifyToken(token)

      AuthMiddleware.#tokenValid(result)

      req.user = result.payload
      next()
    }
    catch (error) {
      res.clearCookie('authToken')
      res.redirect('/login?error=Please log in to access this page')
    }
  }

  // Private static Methods

  static #validateToken(token) {
    if (!token) {
      throw new Error('No token provided')
    }
  }

  static #tokenValid(result) {
    if (!result.valid) {
      throw new Error('Invalid token')
    }
  }
}
    