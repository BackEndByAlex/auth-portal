export class LoginController {
  static #MAX_AGE = 3600000 // 1 hour
  static #COOKIE_NAME = 'authToken'
  #loginService

  constructor(loginService) {
    this.#loginService = loginService
  }

  handleLogin(req, res) {
    try {
      const { username, password } = req.body

      this.#validateLoginInput(username, password)

      const token = this.#loginService.loginUser(username, password)
      this.#setAuthenticationCookie(res, token)

      this.#redirectToIndex(res)
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

  #redirectToIndex(res) {
    res.redirect('index')
  }
}