export class AuthenticateController {
  static #COOKIE_MAX_AGE = 3600 // 1 hour
  static #COOKIE_NAME = 'authToken'
  #authService

  constructor(authService) {
    this.#authService = authService
  }

  handleRegister (req, res) {
    try {
      const { username, password, confirmPassword } = req.body

      this.#validateRegistrationInput(username, password, confirmPassword)


      const token = this.#authService.registerUser(username, password)
      this.#setAuthenticationCookie(res, token)

      this.#redirectToLogin(res)
    }
    catch (error) {
      res.redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }
  }

  // Private Methods

  #validateRegistrationInput (username, password, confirmPassword) {
    this.#ensureAllFieldsProvided(username, password, confirmPassword)
    this.#ensurePasswordsMatch(password, confirmPassword)
  }

  #ensureAllFieldsProvided (username, password, confirmPassword) {
    if (!username || !password || !confirmPassword) {
      throw new Error('All fields are required')
    }
  }

  #ensurePasswordsMatch (password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }
  }

  #setAuthenticationCookie (res, token) {
    res.cookie(AuthenticateController.#COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      maxAge: AuthenticateController.#COOKIE_MAX_AGE
    })
  }

  #redirectToLogin (res) {
    res.redirect('/login')
  }
}