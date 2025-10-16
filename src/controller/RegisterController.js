export class RegisterController {
  static #COOKIE_MAX_AGE = 3600000 // 1 hour
  static #COOKIE_NAME = 'authToken'
  #registerService

  constructor(registerService) {
    this.#registerService = registerService
  }

  handleRegister (req, res) {
    try {
      const { username, password, confirmPassword } = req.body

      this.#validateRegistrationInput(username, password, confirmPassword)

      this.#validatePasswordStrength(password)


      const token = this.#registerService.registerUser(username, password)
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

  #validatePasswordStrength (password) {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)

    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
      throw new Error('Password must be at least 8 characters long and include uppercase letters, lowercase letters, and numbers')
    }
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
    res.cookie(RegisterController.#COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      maxAge: RegisterController.#COOKIE_MAX_AGE
    })
  }

  #redirectToLogin (res) {
    res.redirect('/login')
  }
}