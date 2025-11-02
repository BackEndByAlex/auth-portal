/**
 * Adapter middleware that handles HTTP request/response for login.
 */
export class LoginAdapterMiddleware {
  static #MAX_AGE = 3600000 // 1 hour
  static #COOKIE_NAME = 'authToken'

  #loginController

  constructor(loginController) {
    this.#loginController = loginController
  }

  /**
   * Handles the HTTP request/response cycle for login.
   */
  handle(req, res) {
    try {
      const inputData = {
        username: req.validatedData.username,
        password: req.validatedData.password
      }

      const result = this.#loginController.handleLogin(inputData)

      this.#handleResponse(res, result)
    } catch (error) {
      res.redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }
  }

  #handleResponse(res, result) {
    if (result.success) {
      this.#setAuthenticationCookie(res, result.token)
      res.redirect(result.redirectTo)
    } else {
      res.redirect(`/login?error=${encodeURIComponent(result.error)}`)
    }
  }

  #setAuthenticationCookie(res, token) {
    res.cookie(LoginAdapterMiddleware.#COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: LoginAdapterMiddleware.#MAX_AGE
    })
  }
}