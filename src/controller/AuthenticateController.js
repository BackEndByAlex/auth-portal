export class AuthenticateController {
  static #MAX_AGE = 3600 // 1 hour
  #authService

  constructor(authService) {
    this.#authService = authService
  }

  handleRegister (req, res) {
    try {
      const { username, password, confirmPassword } = req.body

      this.#isUserCredentialsValid(username, password, confirmPassword)
      this.#isPasswordAndConfirmPasswordMatch(password, confirmPassword)

      const token = this.#createUser(username, password)
      this.#setAuthCookie(res, token)

      res.redirect('/login')
    }
    catch (error) {
      res.redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }
  }

  // Private Methods

  #isUserCredentialsValid (username, password, confirmPassword) {
    if (!username || !password || !confirmPassword) {
      throw new Error('All fields are required')
    }
  }

  #isPasswordAndConfirmPasswordMatch (password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error('Password and Confirm Password do not match')
    }
  }

  #createUser (username, password) {
    return this.#authService.createUser(username, password)
  }

  #setAuthCookie (res, token) {
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: AuthenticateController.#MAX_AGE
    })
  }
}