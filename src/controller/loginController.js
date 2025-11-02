/**
 * Use user credentials and login service to authenticate user.
 */
export class LoginController {
  #loginService

  constructor(loginService) {
    this.#loginService = loginService
  }

  handleLogin(inputData) {
    try {
      const { username, password } = inputData

      const token = this.#loginService.loginUser(username, password)

      return {
        success: true,
        token: token,
        redirectTo: '/index'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}