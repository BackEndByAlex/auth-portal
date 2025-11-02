/**
 * Adapter middleware that handles HTTP request/response for registration.
 */
export class RegisterAdapterMiddleware {
  static #COOKIE_MAX_AGE = 3600000 // 1 hour
  static #COOKIE_NAME = 'authToken'

  #registerController

  constructor(registerController) {
    this.#registerController = registerController
  }

  /**
   * Handles the HTTP request/response cycle for registration.
   */
  handle(req, res) {
    try {
      const inputData = {
        username: req.validatedData.username,
        password: req.validatedData.password
      }

      const result = this.#registerController.handleRegister(inputData)

      this.#handleResponse(res, result)
    } catch (error) {
      res.redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }
  }

  #handleResponse(res, result) {
    if (result.success) {
      this.#setAuthenticationCookie(res, result.token)
      res.redirect(result.redirectTo)
    } else {
      res.redirect(`/register?error=${encodeURIComponent(result.error)}`)
    }
  }

  #setAuthenticationCookie(res, token) {
    res.cookie(RegisterAdapterMiddleware.#COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: RegisterAdapterMiddleware.#COOKIE_MAX_AGE
    })
  }
}