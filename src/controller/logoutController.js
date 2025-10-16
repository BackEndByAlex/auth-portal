export class LogoutController {
  static #COOKIE_NAME = 'authToken'
  #logoutService

  constructor(logoutService) {
    this.#logoutService = logoutService
  }

  handleLogout (req, res) {
    try {
      const token = this.#getAuthenticationToken(req)

      this.#logoutService.logoutUser(token)

      this.#clearAuthCookie(res)
      this.#redirectToHome(res)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  // private methods

  #getAuthenticationToken(req) {
    return req.cookies[LogoutController.#COOKIE_NAME]
  }

  #clearAuthCookie(res) {
    res.clearCookie(LogoutController.#COOKIE_NAME)
  }

  #redirectToHome(res) {
    res.redirect('../../')
  }

}