import { issueToken, verifyToken, decodeToken, revokeToken, refreshToken, rotateKey  } from "token-auth-edu"
import { User } from "../models/user.js"

export class AuthService {
  #userRepository
  #tokenTtlSeconds

  constructor(userRepository) {
    this.#userRepository = userRepository
    this.#tokenTtlSeconds = 3600
  }

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