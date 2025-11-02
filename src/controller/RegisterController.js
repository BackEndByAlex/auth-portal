/**
 * Users can register by providing a username, password, and confirming the password.
 * 
 * Warning: Data is stored in-memory and will be lost when the server restarts.
 * This is for demonstration purposes for token-auth-edu package.
 */
export class RegisterController {
  #registerService

  constructor(registerService) {
    this.#registerService = registerService
  }

  handleRegister(inputData) {
    try {
      const { username, password } = inputData

      const token = this.#registerService.registerUser(username, password)

      return {
        success: true,
        token: token,
        redirectTo: '/login'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}