import { verifyToken } from "token-auth-edu"

/**
 * A middle man protecting routes that require authentication.
 */
export class AuthMiddleware {

  /**
   * Check if the request has a valid authentication token.
   */
  authenticate(req, res, next) {
    try { 
      const token = req.cookies.authToken

      this.#validateToken(token)

      const result = verifyToken(token)

      this.#tokenValid(result)

      req.user = result.payload
      next()
    }
    catch (error) {
      res.clearCookie('authToken')
      res.redirect('/login?error=Please log in to access this page')
    }
  }

  // Private Methods

  #validateToken(token) {
    if (!token) {
      throw new Error('No token provided')
    }
  }

  #tokenValid(result) {
    if (!result.valid) {
      throw new Error('Invalid token')
    }
  }
}
    