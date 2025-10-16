export class LoginController {
  #authService

  constructor(authService) {
    this.#authService = authService
  }
}