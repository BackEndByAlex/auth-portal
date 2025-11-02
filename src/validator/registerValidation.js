/**
 * Validates registration input data.
 */
export class RegisterValidationMiddleware {
  /**
   * Validates registration request data.
   */
  validate(req, res, next) {
    try {
      const { username, password, confirmPassword } = req.body

      this.#validateRegistrationInput(username, password, confirmPassword)

      this.#validatePasswordStrength(password)

      // Pass validated data to next middleware
      req.validatedData = { username, password }
      next()
    } catch (error) {
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
      throw new Error('Something went wrong with your credentials. Please try again.')
    }
  }
}