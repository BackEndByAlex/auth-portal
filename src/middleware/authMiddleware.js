import { verifyToken } from "token-auth-edu"

export class AuthMiddleware {

  static authenticate(req, res, next) {
    try { 
      const token = req.cookies.authToken

      console.log('AuthMiddleware: Retrieved token from cookies:', token)

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
    