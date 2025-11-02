/**
 * Validates login input data.
 */
export class LoginValidationMiddleware {
    validate(req, res, next) {
    try {
      const { username, password } = req.body

      if (!username || !password) {
        throw new Error('All fields are required')
      }

      req.validatedData = { username, password }
      next()
    } catch (error) {
      res.redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }
  }
}