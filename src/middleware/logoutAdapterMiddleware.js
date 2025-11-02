/**
 * Adapter middleware that handles HTTP request/response for logout.
 */
export class LogoutAdapterMiddleware {
  static #COOKIE_NAME = 'authToken'

  #logoutController

  constructor(logoutController) {
    this.#logoutController = logoutController
  }

  /**
   * Handles the HTTP request/response cycle for logout.
   */
  handle(req, res) {
    try {
      const inputData = {
        token: req.cookies[LogoutAdapterMiddleware.#COOKIE_NAME]
      }

      const result = this.#logoutController.handleLogout(inputData)

      this.#handleResponse(res, result)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  #handleResponse(res, result) {
    if (result.success) {
      this.#clearAuthCookie(res)
      res.redirect(result.redirectTo)
    } else {
      res.status(500).json({ error: result.error })
    }
  }

  #clearAuthCookie(res) {
    res.clearCookie(LogoutAdapterMiddleware.#COOKIE_NAME)
  }
}