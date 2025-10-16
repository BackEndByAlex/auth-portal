import { issueToken } from "token-auth-edu"

export class LoginService {
  #userRepository
  #tokenTtlSeconds

  constructor(userRepository) {
    this.#userRepository = userRepository
    this.#tokenTtlSeconds = 3600 // 1 hour
  }

  loginUser(username, password) {
    const user = this.#userRepository.findByUsername(username)

    this.#validateUserCredentials(user, password)

    return this.#issueTokenForUser(user)
  }

  // private methods

  #validateUserCredentials(user, password) {
    if (!user || !user.verifyPassword(password)) {
      throw new Error('Invalid username or password')
    }
  }

  #issueTokenForUser(user) {
    const payload = { username: user.getUsername() }
    return issueToken(payload, this.#tokenTtlSeconds)
  }
}

