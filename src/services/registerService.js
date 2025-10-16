import { issueToken } from "token-auth-edu"
import { User } from "../models/user.js"

/**
 * Issue authentication tokens for users upon successful registration.
 */
export class RegisterService {
  #userRepository
  #tokenTtlSeconds

  constructor(userRepository) {
    this.#userRepository = userRepository
    this.#tokenTtlSeconds = 3600 // 1 hour
  }

  /**
   * Registers a new user and issues an authentication token.
   * @param {string} username
   * @param {string} password
   * @return {string} The authentication token.
   */
  registerUser (username, password) {
    this.#ensureUserDoesNotExist(username)

    const user = this.#createUser(username, password)
    this.#userRepository.save(user)

    return this.#issueTokenForUser(user)
  }

  #ensureUserDoesNotExist (username) {
    if (this.#userRepository.exists(username)) {
      throw new Error('Username already exists')
    }
  }

  #createUser (username, password) {
    return new User(username, password)
  }

  #issueTokenForUser (user) {
    const payload = { username: user.getUsername() }
    return issueToken(payload, this.#tokenTtlSeconds)
  }
}