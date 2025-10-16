export class LoginController {
  static #MAX_AGE = 3600 // 1 hour
  static #COOKIE_NAME = 'authToken'
  #authService

  constructor(authService) {
    this.#authService = authService
  }

  handleLogin(req, res) {
    try {
      const { username, password } = req.body

      this.#validateLoginInput(username, password)

      const token = this.#authService.authenticateUser(username, password)
      this.#setAuthenticationCookie(res, token)

      this.#redirectToDashboard(res)
    }
    catch (error) {
      res.redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }
  }

  // Private Methods

  #validateLoginInput(username, password) {
    this.#ensureAllFieldsProvided(username, password)
  }

  #ensureAllFieldsProvided(username, password) {
    if (!username || !password) {
      throw new Error('All fields are required')
    }
  }

  #setAuthenticationCookie(res, token) {
    res.cookie(LoginController.#COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      maxAge: LoginController.#MAX_AGE
    })
  }

  #redirectToDashboard(res) {
    res.redirect('/index')
  }
}