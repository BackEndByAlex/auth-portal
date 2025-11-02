/**
 * Use token and logout service to log out user.
 */
export class LogoutController {
  #logoutService

  constructor(logoutService) {
    this.#logoutService = logoutService
  }

  handleLogout(inputData) {
    try {
      const { token } = inputData

      this.#logoutService.logoutUser(token)

      return {
        success: true,
        redirectTo: '../../'
      }
    } catch (error) {
      return {
        success: false,
        error: 'Internal server error'
      }
    }
  }
}